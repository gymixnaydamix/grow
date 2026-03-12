import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const studentSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is too short'),
    email: z.string().email('Invalid email address').optional(),
    grade: z.string().optional(),
    status: z.enum(['Active', 'Inactive', 'Graduated']).optional(),
  }),
});

export const invoiceSchema = z.object({
  body: z.object({
    student_id: z.string().uuid('Invalid student ID'),
    amount: z.number().positive('Amount must be positive'),
    due_date: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    status: z.enum(['Paid', 'Unpaid', 'Overdue']).optional(),
  }),
});

export const settingsSchema = z.object({
  body: z.record(z.any()),
});
