import { httpClient } from '@/libs/httpClient'

export interface MeResponse {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function meService() {
  return httpClient.get<MeResponse>('/sessions/validate')
}
