import { Editor } from '@/components/Editor'
import { SubjectComboBox } from '@/components/SubjectComboBox'
import { TopicComboBox } from '@/components/TopicComboBox'
import { useCreateQuestion } from '@/hooks/useCreateQuestion'
import { useGetTopics } from '@/hooks/useGetTopics'
import {
  Badge,
  Button,
  Container,
  Field,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Switch,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { Suspense, useEffect } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
import { BiPlus } from 'react-icons/bi'
import { IoRemove } from 'react-icons/io5'

export function CreateQuestionPage() {
  const { form, onSubmit, isLoading } = useCreateQuestion()
  const { topics } = useGetTopics()
  const subjectId = form.watch('subjectId')
  const { setValue } = form

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'alternatives',
  })

  useEffect(() => {
    setValue('topicIds', [])
  }, [subjectId, setValue])

  return (
    <Container py={8}>
      <Heading mb={8} as="h2" textStyle="2xl">
        Criar Questão
      </Heading>

      <form onSubmit={form.handleSubmit(onSubmit)}>
        <VStack gap={4} mb={8} alignItems="flex-start">
          <Field.Root required invalid={!!form.formState.errors.subjectId}>
            <Field.Label htmlFor="subject">
              Selecione uma matéria
              <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={form.control}
              name="subjectId"
              render={({ field }) => (
                <Suspense fallback={<Skeleton height="40px" width="320px" />}>
                  <SubjectComboBox {...field} />
                </Suspense>
              )}
            />
            <Field.ErrorText>
              {form.formState.errors.subjectId?.message}
            </Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!form.formState.errors.topicIds}>
            <Field.Label htmlFor="topics">
              Selecione um ou mais tópicos
              <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={form.control}
              name="topicIds"
              render={({ field }) => (
                <Suspense fallback={<Skeleton height="40px" width="320px" />}>
                  <TopicComboBox
                    {...field}
                    selectedSubjectId={form.watch('subjectId')}
                  />
                </Suspense>
              )}
            />
            <Field.ErrorText>
              {form.formState.errors.topicIds?.message}
            </Field.ErrorText>
          </Field.Root>

          <Wrap gap={2} width="100%" maxWidth="320px" mr="auto">
            {form.watch('topicIds').map((topicId) => (
              <Badge size="md" key={topicId}>
                {topics.find((t) => t.id === topicId)?.name || topicId}
              </Badge>
            ))}
          </Wrap>

          <Field.Root required invalid={!!form.formState.errors.text}>
            <Field.Label htmlFor="text">
              Enunciado
              <Field.RequiredIndicator />
            </Field.Label>
            <Controller
              control={form.control}
              name="text"
              render={({ field }) => (
                <Editor {...field} placeholder="Digite aqui seu enunciado." />
              )}
            />
            <Field.ErrorText>
              {form.formState.errors.text?.message}
            </Field.ErrorText>
          </Field.Root>

          <VStack width="100%" alignItems="flex-start" gap={4}>
            <Flex
              width="full"
              alignItems="center"
              maxWidth="476px"
              justifyContent="space-between"
            >
              <Heading as="h3" textStyle="lg">
                Alternativas
              </Heading>

              <Wrap>
                <IconButton
                  size="xs"
                  onClick={() => append({ text: '', isCorrect: false })}
                >
                  <BiPlus />
                </IconButton>

                {fields.length > 2 && (
                  <IconButton
                    size="xs"
                    variant="subtle"
                    onClick={() => remove(fields.length - 1)}
                  >
                    <IoRemove />
                  </IconButton>
                )}
              </Wrap>
            </Flex>

            <VStack width="100%" gap={4}>
              {fields.map((alternative, index) => (
                <VStack key={alternative.id} width="100%" gap={2}>
                  <Field.Root
                    required
                    invalid={
                      !!form.formState.errors.alternatives?.[index]?.text
                    }
                  >
                    <Field.Label width="full" maxWidth="476px">
                      <Flex width="full" justifyContent="center" gap={2}>
                        <Controller
                          control={form.control}
                          name={`alternatives.${index}.isCorrect`}
                          render={({ field }) => (
                            <Field.Root width="fit">
                              <Switch.Root
                                name={field.name}
                                checked={field.value}
                                invalid={
                                  !!form.formState.errors.alternatives?.[index]
                                    ?.isCorrect
                                }
                              >
                                <Switch.HiddenInput
                                  onBlur={field.onBlur}
                                  onChange={(event) =>
                                    field.onChange(event.currentTarget.checked)
                                  }
                                />
                                <Switch.Control />
                              </Switch.Root>
                              <Field.ErrorText>
                                {
                                  form.formState.errors.alternatives?.[index]
                                    ?.isCorrect?.message
                                }
                              </Field.ErrorText>
                            </Field.Root>
                          )}
                        />

                        <Wrap width="full" gap={1}>
                          Alternativa {index + 1}
                          <Field.RequiredIndicator />
                        </Wrap>
                      </Flex>
                    </Field.Label>
                    <Controller
                      control={form.control}
                      name={`alternatives.${index}.text`}
                      render={({ field }) => (
                        <Editor
                          {...field}
                          placeholder={`Digite o texto da alternativa ${
                            index + 1
                          }.`}
                        />
                      )}
                    />
                    <Field.ErrorText>
                      {
                        form.formState.errors.alternatives?.[index]?.text
                          ?.message
                      }
                    </Field.ErrorText>
                  </Field.Root>
                </VStack>
              ))}
            </VStack>
          </VStack>
        </VStack>

        <Wrap gap={2} mr="auto">
          <Button type="submit" disabled={isLoading}>
            Salvar Questão
          </Button>
        </Wrap>
      </form>
    </Container>
  )
}
