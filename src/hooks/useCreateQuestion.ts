import { toaster } from '@/components/ui/toaster'
import { createQuestionSchema } from '@/schemas/createQuestionSchema'
import {
  createQuestionService,
  type CreateQuestionRequest,
  type CreateQuestionResponse,
} from '@/services/createQuestionService'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'
import { useForm } from 'react-hook-form'

export function useCreateQuestion() {
  const form = useForm<CreateQuestionRequest>({
    defaultValues: {
      text: '',
      subjectId: '',
      topicIds: [],
      alternatives: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    },
    mode: 'onBlur',
    resolver: zodResolver(createQuestionSchema),
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ['create-question'],
    mutationFn: createQuestionService,
    onSuccess: (data: AxiosResponse<CreateQuestionResponse>) => {
      form.reset()
      toaster.success({
        title: 'Questão criada com sucesso!',
        description: `ID da questão: ${data.data?.id}`,
      })
    },
    onError: (error) => {
      toaster.error({
        title: 'Erro ao criar questão',
        description:
          error instanceof Error
            ? error.message
            : 'Ocorreu um erro inesperado. Tente novamente mais tarde.',
      })
    },
  })

  function onSubmit(data: CreateQuestionRequest) {
    mutate(data)
  }

  return { form, onSubmit, isLoading: isPending }
}
