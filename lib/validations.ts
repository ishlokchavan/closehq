import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Enter your full name').max(80),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  email: z.string().email('Enter a valid email').max(120),
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;
