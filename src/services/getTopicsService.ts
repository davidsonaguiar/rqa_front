import { httpClient } from '@/libs/httpClient'

export interface GetTopicResponse {
  id: string
  name: string
  subjectId: string
  subject: {
    id: string
    name: string
  }
}

export async function getTopicsService() {
  return await httpClient.get<GetTopicResponse[]>('/topics')
}
