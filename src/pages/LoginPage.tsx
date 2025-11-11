import { PasswordInput } from '@/components/ui/password-input'
import { useLogin } from '@/hooks/useLogin'
import {
  Button,
  Card,
  Field,
  Heading,
  Input,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react'
import { Link } from 'react-router'

export function LoginPage() {
  const { form, onSubmit, isPending } = useLogin()

  return (
    <>
      <Heading as="h1" color="white" size="3xl">
        Banco de questões
      </Heading>
      <Card.Root w="full" maxW="md" mx="auto" mt={4} p={6} boxShadow="lg">
        <Card.Header>
          <Card.Title asChild>
            <Heading as="h2">Login</Heading>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <form id="login" onSubmit={form.handleSubmit(onSubmit)}>
            <VStack gap={4}>
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
          <ChakraLink colorPalette="teal" ml="auto" mt={5} asChild>
            <Link to="/auth/forgot-password">Esqueceu a senha?</Link>
          </ChakraLink>
        </Card.Body>

        <Card.Footer>
          <VStack gap={2} w="full">
            <Button
              disabled={isPending}
              bgColor="teal"
              type="submit"
              width="full"
              form="login"
            >
              Entrar
            </Button>
            <ChakraLink width="full" textDecoration="none" asChild>
              <Link to="/auth/register">
                <Button
                  disabled={isPending}
                  type="button"
                  width="full"
                  variant="ghost"
                >
                  Ainda não tenho conta
                </Button>
              </Link>
            </ChakraLink>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  )
}
