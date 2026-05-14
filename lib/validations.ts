import { z } from 'zod';

export const leadSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name').max(50),
  lastName: z.string().min(1, 'Enter your last name').max(50),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  email: z.string().email('Enter a valid email').max(120),
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const specialistSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name').max(50),
  lastName: z.string().min(1, 'Enter your last name').max(50),
  email: z.string().email('Enter a valid email').max(120),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  message: z.string().min(10, 'Tell us a bit about your expertise').max(1000),
  website: z.string().max(0).optional(),
});

export type SpecialistFormValues = z.infer<typeof specialistSchema>;
