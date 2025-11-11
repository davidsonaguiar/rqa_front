import { meService, type MeResponse } from '@/services/meService'
import { useQuery } from '@tanstack/react-query'
import type { AxiosResponse } from 'axios'

export function useGetMe() {
  const { data, isLoading, isError } = useQuery<AxiosResponse<MeResponse>>({
    queryKey: ['me'],
    queryFn: meService,
    enabled: !!localStorage.getItem('token'),
  })

  return {
    me: data?.data,
    isLoading,
    isError,
  }
}
