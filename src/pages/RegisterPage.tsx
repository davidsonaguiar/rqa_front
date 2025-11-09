import { PasswordInput } from '@/components/ui/password-input'
import { useRegisterUser } from '@/hooks/useRegisterUser'
import { Button, Card, Field, Heading, Input, VStack } from '@chakra-ui/react'

export function RegisterPage() {
  const { form, onSubmit, isPending } = useRegisterUser()

  return (
    <VStack
      minH="100vh"
      justify="center"
      bg="linear-gradient(to bottom, var(--chakra-colors-teal-600) 50%, var(--chakra-colors-white) 50%)"
      p={4}
    >
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
            <VStack gap={4} mb={6}>
              <Field.Root invalid={!!form.formState.errors.name}>
                <Field.Label>
                  Nome <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  {...form.register('name')}
                />
                <Field.ErrorText>
                  {form.formState.errors.name?.message}x
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!form.formState.errors.email}>
                <Field.Label>
                  Email <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  {...form.register('email')}
                />
                <Field.ErrorText>
                  {form.formState.errors.email?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!form.formState.errors.password}>
                <Field.Label>
                  Senha <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register('password')}
                />
                <Field.ErrorText>
                  {form.formState.errors.password?.message}
                </Field.ErrorText>
              </Field.Root>
            </VStack>
          </form>
        </Card.Body>

        <Card.Footer>
          <Button
            disabled={isPending}
            bgColor="teal"
            type="submit"
            width="full"
            form="register-user"
          >
            Registrar
          </Button>
        </Card.Footer>
      </Card.Root>
    </VStack>
  )
}
