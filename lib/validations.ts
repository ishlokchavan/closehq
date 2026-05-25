import { z } from 'zod';

export const leadFocusValues = ['residential', 'commercial', 'offplan'] as const;
export const leadDealTypeValues = [
  'apartments',
  'villas',
  'townhouses',
  'commercial',
  'other',
] as const;

export const leadSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name').max(50),
  lastName: z.string().min(1, 'Enter your last name').max(50),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  email: z.string().email('Enter a valid email').max(120),
  jobTitle: z
    .string()
    .max(100, 'Keep it under 100 characters')
    .optional()
    .or(z.literal('')),
  focus: z.enum(leadFocusValues).optional(),
  dealTypes: z.array(z.enum(leadDealTypeValues)).max(5).optional(),
  message: z
    .string()
    .max(1000, 'Keep it under 1000 characters')
    .optional()
    .or(z.literal('')),
  consentPrivacy: z.boolean().refine((v) => v === true, {
    message: 'You must agree to continue',
  }),
  consentMarketing: z.boolean().optional().default(false),
  website: z.string().optional(),
  referredByCode: z
    .string()
    .trim()
    .max(16)
    .optional()
    .or(z.literal('')),
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
  consentPrivacy: z.boolean().refine((v) => v === true, {
    message: 'You must agree to continue',
  }),
  website: z.string().optional(),
});

export type SpecialistFormValues = z.infer<typeof specialistSchema>;

export const internSchema = z.object({
  firstName: z.string().min(1, 'Enter your first name').max(50),
  lastName: z.string().min(1, 'Enter your last name').max(50),
  email: z.string().email('Enter a valid email').max(120),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  instagram: z.string().max(50).optional(),
  message: z.string().max(1000).optional(),
  website: z.string().optional(),
});

export type InternFormValues = z.infer<typeof internSchema>;
