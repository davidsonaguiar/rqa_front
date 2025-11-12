import { httpClient } from '@/libs/httpClient'

export interface GetSubjectsResponse {
  id: string
  name: string
}

export async function getSubjectsService() {
  return await httpClient.get<GetSubjectsResponse[]>('/subjects')
}
