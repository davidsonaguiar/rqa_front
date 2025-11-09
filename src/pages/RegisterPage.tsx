import { PasswordInput } from '@/components/ui/password-input'
import { useRegisterUser } from '@/hooks/useRegisterUser'
import { Button, Card, Field, Heading, Input, VStack } from '@chakra-ui/react'

export function RegisterPage() {
  const { form, onSubmit, isPending } = useRegisterUser()

  return (
    <>
      <Heading as="h1" color="white" size="3xl">
        Banco de questões
      </Heading>
      <Card.Root w="full" maxW="md" mx="auto" mt={4} p={6} boxShadow="lg">
        <Card.Header>
          <Card.Title asChild>
            <Heading as="h2">Registre-se</Heading>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <form id="register-user" onSubmit={form.handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <Field.Root required invalid={!!form.formState.errors.name}>
                <Field.Label>
                  Nome <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...form.register('name', { required: true })}
                />
                <Field.ErrorText>
                  {form.formState.errors.name?.message}x
                </Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!form.formState.errors.email}>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...form.register('email', { required: true })}
                />
                <Field.ErrorText>
                  {form.formState.errors.email?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root required invalid={!!form.formState.errors.password}>
                <Field.Label>
                  Senha <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register('password', { required: true })}
                />
                <Field.ErrorText>
                  {form.formState.errors.password?.message}
                </Field.ErrorText>
              </Field.Root>
            </VStack>
          </form>
        </Card.Body>

        <Card.Footer>
          <VStack gap={2} w="full">
            <Button
              disabled={isPending}
              bgColor="teal"
              type="submit"
              width="full"
              form="register-user"
            >
              Registrar
            </Button>
            <Button
              disabled={isPending}
              type="button"
              width="full"
              variant="ghost"
            >
              Já tenho conta
            </Button>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  )
}
