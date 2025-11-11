import z from 'zod'

export const forgetPasswordSchema = z.object({
  email: z.email('Digite um e-mail válido'),
})
