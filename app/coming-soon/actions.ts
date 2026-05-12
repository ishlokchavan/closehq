'use server'

import { z } from 'zod'

const educatorSchema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  expertise: z.string().min(1, 'Please select at least one area of expertise'),
  focus: z.string().optional(),
})

const learnerSchema = z.object({
  fullName: z.string().min(2, 'Please enter your name'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  email: z.string().email().optional().or(z.literal('')),
  interests: z.string().optional(),
  role: z.string().optional(),
})

async function saveToSupabase(table: string, data: Record<string, unknown>) {
  const { createClient } = await import('@supabase/supabase-js')
  const sb = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (sb as any).from(table).insert(data)
  if (error) console.error(`[${table}] insert error:`, error.message)
  return !error
}

async function notifyAdmin(type: 'educator' | 'learner', name: string, phone: string) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.log(`[coming-soon] New ${type}: ${name} ${phone}`)
    return
  }
  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)
    await resend.emails.send({
      from: 'iClose Academy <noreply@iclose.ae>',
      to: ['shlok@iclose.ae'],
      subject: `New ${type} signup — ${name}`,
      html: `<p><strong>${name}</strong> signed up as a ${type}.</p><p>Phone: ${phone}</p>`,
    })
  } catch (err) {
    console.error('[coming-soon] notify error:', err)
  }
}

export async function submitEducatorInterest(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const parsed = educatorSchema.safeParse({
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    expertise: formData.get('expertise'),
    focus: formData.get('focus') || '',
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Invalid input' }
  }

  const { fullName, phone, email, expertise, focus } = parsed.data

  const saved = await saveToSupabase('academy_educators', {
    full_name: fullName,
    phone,
    email: email || null,
    expertise: expertise.split(',').filter(Boolean),
    focus: focus || null,
    source: 'coming_soon',
    created_at: new Date().toISOString(),
  })

  if (!saved) {
    // Still return ok — don't block the user if DB is not set up yet
    console.warn('[coming-soon] DB save failed but proceeding')
  }

  await notifyAdmin('educator', fullName, phone)
  return { ok: true }
}

export async function submitLearnerInterest(
  formData: FormData
): Promise<{ ok: boolean; error?: string }> {
  const parsed = learnerSchema.safeParse({
    fullName: formData.get('fullName'),
    phone: formData.get('phone'),
    email: formData.get('email') || '',
    interests: formData.get('interests') || '',
    role: formData.get('role') || '',
  })

  if (!parsed.success) {
    return { ok: false, error: parsed.error.errors[0]?.message ?? 'Invalid input' }
  }

  const { fullName, phone, email, interests, role } = parsed.data

  const saved = await saveToSupabase('academy_learners', {
    full_name: fullName,
    phone,
    email: email || null,
    interests: interests ? interests.split(',').filter(Boolean) : [],
    role: role || null,
    source: 'coming_soon',
    created_at: new Date().toISOString(),
  })

  if (!saved) {
    console.warn('[coming-soon] DB save failed but proceeding')
  }

  await notifyAdmin('learner', fullName, phone)
  return { ok: true }
}
