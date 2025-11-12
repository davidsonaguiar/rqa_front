import { Prose } from '@/components/ui/prose'
import { useGetQuestion } from '@/hooks/useGetQuestion'
import {
  Checkbox,
  CheckboxCard,
  Container,
  DataList,
  Float,
  Heading,
  Wrap,
} from '@chakra-ui/react'
import { useParams } from 'react-router'
import Markdown from 'react-markdown'

export function QuestionDetailsPage() {
  const params = useParams()
  const { question } = useGetQuestion(params.id!)

  return (
    <Container py={8}>
      <Heading mb={8} as="h2" textStyle="2xl">
        Detalhes da Questão
      </Heading>

      <Prose p={4} size="lg" mb={8}>
        <Markdown>{question.text}</Markdown>

        <Wrap direction="column" gap={2} mt={4}>
          {question.alternatives.map((alt) => (
            <CheckboxCard.Root key={alt.id} checked={alt.isCorrect}>
              <CheckboxCard.HiddenInput checked={alt.isCorrect} />
              <CheckboxCard.Control>
                <CheckboxCard.Label ml={8}>
                  <Markdown>{alt.text}</Markdown>
                </CheckboxCard.Label>
                <Float placement="middle-start" offset="6">
                  <CheckboxCard.Indicator />
                </Float>
              </CheckboxCard.Control>
            </CheckboxCard.Root>
          ))}
        </Wrap>
      </Prose>
    </Container>
  )
}
