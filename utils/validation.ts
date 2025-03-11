import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Geçerli bir email adresi girin'),
  password: z.string().min(6, 'Şifre en az 6 karakter olmalıdır'),
});

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'REVIEW', 'DONE']),
  reporter: z.string().min(1, 'Reporter is required'),
  assignee: z.string().optional(),
  storyPoints: z.coerce.number().int().min(0).max(100).optional(),
});
