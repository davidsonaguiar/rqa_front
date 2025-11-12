import { httpClient } from '@/libs/httpClient'

export interface CreateQuestionRequest {
  text: string
  subjectId: string
  topicIds: string[]
  alternatives: {
    text: string
    isCorrect: boolean
  }[]
}

export interface CreateQuestionResponse {
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

export async function createQuestionService(data: CreateQuestionRequest) {
  return await httpClient.post<CreateQuestionResponse>('/questions', data)
}
