import z from 'zod'

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, 'A nova senha deve ter no mínimo 8 caracteres'),
    confirmNewPassword: z
      .string()
      .min(6, 'A confirmação da nova senha deve ter no mínimo 8 caracteres'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmNewPassword'],
  })
