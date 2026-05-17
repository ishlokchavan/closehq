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
  consentPrivacy: z.boolean().refine((v) => v === true, {
    message: 'You must agree to continue',
  }),
  consentMarketing: z.boolean().optional().default(false),
  website: z.string().max(0).optional(),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

export const specialistSchema = z.object({
  specialistType: z.enum(['area_expert', 'relationship_manager'], {
    required_error: 'Please select a role',
    invalid_type_error: 'Please select a role',
  }),
  firstName: z.string().min(1, 'Enter your first name').max(50),
  lastName: z.string().min(1, 'Enter your last name').max(50),
  email: z.string().email('Enter a valid email').max(120),
  phone: z
    .string()
    .min(7, 'Enter a valid phone number')
    .max(20)
    .regex(/^[+\d\s()-]+$/, 'Use digits, spaces, +, - or ()'),
  message: z.string().min(10, 'Tell us a bit about your background').max(1000),
  consentPrivacy: z.boolean().refine((v) => v === true, {
    message: 'You must agree to continue',
  }),
  website: z.string().max(0).optional(),
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
  website: z.string().max(0).optional(),
});

export type InternFormValues = z.infer<typeof internSchema>;
