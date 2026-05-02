import { z } from 'zod';

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Please enter your full name')
    .max(80, 'Name is too long'),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20, 'Phone number is too long')
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  email: z
    .string()
    .email('Enter a valid email')
    .max(120, 'Email is too long')
    .optional()
    .or(z.literal('')),
  isAgent: z.enum(['yes', 'no'], {
    required_error: 'Please choose one',
  }),
  dealSize: z.enum(['0-1', '1-3', '3-5', '5-10', '10+'], {
    required_error: 'Please choose your deal size',
  }),
  // Honeypot — must remain empty
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const dealSizeOptions = [
  { value: '0-1', label: '0–1 deals / month (just starting)' },
  { value: '1-3', label: '1–3 deals / month' },
  { value: '3-5', label: '3–5 deals / month' },
  { value: '5-10', label: '5–10 deals / month' },
  { value: '10+', label: '10+ deals / month' },
] as const;
