import { toaster } from '@/components/ui/toaster'
import { loginSchema } from '@/schemas/loginSchema'
import { loginService, type LoginRequest } from '@/services/loginService'
import type { ApiErrorResponse } from '@/types/error'
import { zodResolver } from '@hookform/resolvers/zod/src/index.js'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export function useLogin() {
  const navigate = useNavigate()

  const form = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginService,
    onSuccess: (data) => {
      form.reset()
      toaster.success({
        title: 'Login realizado com sucesso!',
        description: 'Bem-vindo de volta!',
      })
      localStorage.setItem('token', data.data.token)
      navigate('/')
    },
    onError: (err) => {
      const axiosError = err as AxiosError<ApiErrorResponse>
      const message = axiosError.response?.data?.message
      toaster.error({
        title: 'Erro ao realizar login',
        description: message || 'Erro desconhecido ao realizar login.',
      })
    },
  })

  function onSubmit(data: LoginRequest) {
    mutate(data)
  }

  return {
    form,
    onSubmit,
    isPending,
  }
}
