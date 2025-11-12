import { httpClient } from '@/libs/httpClient'

export interface GetQuestionResponse {
  id: string
  text: string
  subjectId: string
  alternatives: [
    {
      id: string
      text: string
      isCorrect: boolean
      questionId: string
    },
  ]
  topics: [
    {
      id: string
      name: string
      subjectId: string
      subject: {
        id: string
        name: string
      }
    },
  ]
  subject: {
    id: string
    name: string
  }
}

export async function getQuestionService(questionId: string) {
  return await httpClient.get<GetQuestionResponse>(`/questions/${questionId}`)
}
