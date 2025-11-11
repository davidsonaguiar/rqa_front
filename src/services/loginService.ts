import { httpClient } from '@/libs/httpClient'

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
}

export async function loginService(data: LoginRequest) {
  return await httpClient.post<LoginResponse>('/auth', data)
}
