import { getTopicsService } from '@/services/getTopicsService'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useGetTopics() {
  const { data } = useSuspenseQuery({
    queryKey: ['topics'],
    queryFn: getTopicsService,
  })

  return { topics: data?.data || [] }
}
