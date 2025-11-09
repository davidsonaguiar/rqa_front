import { httpClient } from '@/libs/httpClient'

export interface RegisterUserRequest {
  name: string
  email: string
  password: string
}

export interface RegisterUserResponse {
  id: string
  name: string
  email: string
  createdAt: string
}

export async function registerUserService(data: RegisterUserRequest) {
  return await httpClient.post<RegisterUserResponse>('/users', data)
}
