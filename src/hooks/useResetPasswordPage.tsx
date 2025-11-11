import { toaster } from '@/components/ui/toaster'
import { resetPasswordSchema } from '@/schemas/resetPasswordSchema'
import { resetPasswordService } from '@/services/resetPasswordService'
import type { ApiErrorResponse } from '@/types/error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import type z from 'zod'

export function useResetPasswordPage() {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(resetPasswordSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: resetPasswordService,
    onSuccess: () => {
      form.reset()
      toaster.success({
        title: 'Senha redefinida com sucesso!',
        description: 'Você já pode fazer login com sua nova senha.',
      })
      navigate('/auth/login')
    },
    onError: (err) => {
      const axiosError = err as AxiosError<ApiErrorResponse>
      const message = axiosError.response?.data?.message
      toaster.error({
        title: 'Erro ao redefinir senha',
        description:
          message || 'Erro desconhecido ao tentar redefinir a senha.',
      })
    },
  })

  function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    const { newPassword } = data
    if (!token || !userId) {
      toaster.error({
        title: 'Erro ao redefinir senha',
        description: 'Token ou ID de usuário ausente.',
      })
      return
    }

    mutate({
      userId,
      token,
      newPassword,
    })
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tokenParam = urlParams.get('token')
    const userIdParam = urlParams.get('userId')

    setToken(tokenParam)
    setUserId(userIdParam)
  }, [])

  return { form, onSubmit, isPending }
}
