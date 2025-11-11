import { httpClient } from '@/libs/httpClient'

export interface ForgetPasswordRequest {
  email: string
}

export interface ForgetPasswordResponse {
  message: string
}

export async function forgotPasswordService(data: ForgetPasswordRequest) {
  return await httpClient.post<ForgetPasswordResponse>(
    '/password/request',
    data
  )
}
