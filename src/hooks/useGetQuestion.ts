import { getQuestionService } from '@/services/getQuestionService'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useGetQuestion(id: string) {
  const { data } = useSuspenseQuery({
    queryKey: ['get-question', id],
    queryFn: () => getQuestionService(id),
  })

  return { question: data.data }
}
