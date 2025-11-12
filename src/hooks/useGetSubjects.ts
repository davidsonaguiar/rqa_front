import { getSubjectsService } from '@/services/getSubjectsService'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useSubjects() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['subjects'],
    queryFn: getSubjectsService,
  })

  return { subjects: data?.data, isLoading }
}
