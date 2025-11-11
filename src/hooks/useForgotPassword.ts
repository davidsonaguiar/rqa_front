import { toaster } from '@/components/ui/toaster'
import { forgetPasswordSchema } from '@/schemas/forgetPasswordSchema'
import {
  forgotPasswordService,
  type ForgetPasswordRequest,
} from '@/services/forgotPasswordService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export function useForgotPassword() {
  const form = useForm<ForgetPasswordRequest>({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(forgetPasswordSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['forgot-password'],
    mutationFn: forgotPasswordService,
    onSuccess: (data) => {
      toaster.success({
        title: 'Solicitação de recuperação enviada!',
        description: data.data.message,
      })
      form.reset()
    },
    onError: () => {
      toaster.error({
        title: 'Erro ao solicitar recuperação de senha',
        description:
          'Houve um erro ao processar sua solicitação. Tente novamente mais tarde.',
      })
    },
  })

  function onSubmit(data: ForgetPasswordRequest) {
    mutate(data)
  }

  return {
    forgotPassword: mutate,
    form,
    onSubmit,
    isPending,
  }
}
