import { toaster } from '@/components/ui/toaster'
import { registerSchema } from '@/schemas/registerSchema'
import {
  registerUserService,
  type RegisterUserRequest,
} from '@/services/registerUserService'
import type { ApiErrorResponse } from '@/types/error'
import { zodResolver } from '@hookform/resolvers/zod/src/index.js'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'

export function useRegisterUser() {
  const form = useForm<RegisterUserRequest>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(registerSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['register-user'],
    mutationFn: registerUserService,
    onSuccess: () => {
      form.reset()
      toaster.success({
        title: 'Usuário registrado com sucesso!',
        description: 'Você já pode fazer login com suas credenciais.',
      })
    },
    onError: (err) => {
      const axiosError = err as AxiosError<ApiErrorResponse>
      const message = axiosError.response?.data?.message
      toaster.error({
        title: 'Erro ao registrar usuário',
        description: message || 'Erro desconhecido ao registrar usuário.',
      })
    },
  })

  function onSubmit(data: RegisterUserRequest) {
    mutate(data)
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}
