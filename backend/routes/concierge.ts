import { Router } from 'express';
import { protect } from '../middleware/auth';
import db from '../db';
import { v4 as uuidv4 } from 'uuid';
import { catchAsync } from '../utils/error-handler';
import { GoogleGenAI } from '@google/genai';

const router = Router();

// Endpoint to "ingest" a document (store its content in DB)
router.post('/ingest', protect, catchAsync(async (req: any, res) => {
  const { title, content, type } = req.body;
  const id = uuidv4();

  db.prepare('INSERT INTO documents (id, title, content, type, school_id) VALUES (?, ?, ?, ?, ?)')
    .run(id, title, content, type || 'general', req.user.school_id || 'school_1');

  res.status(201).json({ status: 'success', data: { id, title } });
}));

// Chat with RAG
router.post('/chat', protect, catchAsync(async (req: any, res) => {
  const { message } = req.body;

  // Simple RAG: find documents related to the message
  // In a real app, use vector search. Here we use basic LIKE for demonstration.
  const docs: any = db.prepare('SELECT content FROM documents WHERE school_id = ? AND content LIKE ? LIMIT 3')
    .all(req.user.school_id || 'school_1', `%${message}%`);

  const context = docs.map((d: any) => d.content).join('\n\n');

  const genAI = new GoogleGenAI(process.env.GEMINI_API_KEY || '');
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    You are a school AI concierge. Use the following context to answer the user's question.
    If the context doesn't contain the answer, use your general knowledge but mention it's not in the official documents.

    Context:
    ${context}

    Question: ${message}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  res.json({ status: 'success', reply: response.text() });
}));

export default router;
