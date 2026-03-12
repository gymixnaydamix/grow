import { Router } from 'express';
import { protect } from '../middleware/auth';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/error-handler';
import { GoogleGenAI } from '@google/genai';

const router = Router();

// Get all ingested documents
router.get('/documents', protect, catchAsync(async (req: any, res) => {
  const docs = db.prepare('SELECT id, title, type, created_at FROM documents WHERE school_id = ?').all(req.user.school_id);
  res.json({ status: 'success', data: docs });
}));

// Delete a document
router.delete('/documents/:id', protect, catchAsync(async (req: any, res) => {
  db.prepare('DELETE FROM documents WHERE id = ? AND school_id = ?').run(req.params.id, req.user.school_id);
  res.json({ status: 'success' });
}));

// Endpoint to "ingest" a document (store its content in DB)
router.post('/ingest', protect, catchAsync(async (req: any, res) => {
  const { title, content, type } = req.body;
  const id = uuidv4();

  db.prepare('INSERT INTO documents (id, title, content, type, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, title, content, type || 'general', req.user.school_id);

  res.status(201).json({ status: 'success', data: { id, title } });
}));

// Chat with RAG
router.post('/chat', protect, catchAsync(async (req: any, res) => {
  const { message } = req.body;

  if (process.env.NODE_ENV === 'production' && !process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required for the AI Concierge in production.');
  }

  // Refined RAG: keyword extraction for better LIKE matching
  const keywords = message.split(' ').filter((w: string) => w.length > 3);
  let docs: any[] = [];

  if (keywords.length > 0) {
    const conditions = keywords.map(() => 'content LIKE ?').join(' OR ');
    const params = keywords.map((k: string) => `%${k}%`);
    docs = db.prepare(`SELECT content FROM documents WHERE school_id = ? AND (${conditions}) LIMIT 5`)
      .all(req.user.school_id, ...params);
  } else {
    docs = db.prepare('SELECT content FROM documents WHERE school_id = ? LIMIT 3').all(req.user.school_id);
  }

  const context = docs.map((d: any) => d.content).join('\n\n');

  try {
    const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || 'AIzaSy...dummy');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      You are a helpful school AI concierge. Use the provided context from the school's official documents to answer the user's question accurately.
      If the context doesn't contain the answer, use your general knowledge but clearly state that the information is not found in the official school documents.
      Be professional, encouraging, and concise.

      Context:
      ${context || 'No specific document context available.'}

      User Question: ${message}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    res.json({ status: 'success', reply: response.text() });
  } catch (error: any) {
    console.error('AI Error:', error);
    res.json({
      status: 'success',
      reply: "I'm currently having trouble reaching my AI core, but I can still search the documents for you. " +
             (context ? "I found some relevant information in our records: " + context.substring(0, 200) + "..." : "Unfortunately, I couldn't find any relevant documents either.")
    });
  }
}));

export default router;
