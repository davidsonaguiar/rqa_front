import z from 'zod'

export const createQuestionSchema = z.object({
  text: z.string().min(1, 'O enunciado é obrigatório'),
  subjectId: z.string().min(1, 'A matéria é obrigatória'),
  topicIds: z.array(z.string()).min(1, 'Selecione pelo menos um tópico'),
  alternatives: z
    .array(
      z.object({
        text: z.string().min(1, 'O texto da alternativa é obrigatório'),
        isCorrect: z.boolean(),
      })
    )
    .min(2, 'São necessárias pelo menos duas alternativas'),
})
