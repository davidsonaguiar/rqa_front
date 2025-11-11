import { httpClient } from '@/libs/httpClient'

export interface ResetPasswordRequest {
  userId: string
  token: string
  newPassword: string
}

export interface ResetPasswordResponse {
  message: string
}

export async function resetPasswordService(data: ResetPasswordRequest) {
  return await httpClient.post<ResetPasswordResponse>('/password/reset', data)
}
