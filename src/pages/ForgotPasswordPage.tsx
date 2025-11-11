import { useForgotPassword } from '@/hooks/useForgotPassword'
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

export function ForgetPasswordPage() {
  const { form, onSubmit, isPending } = useForgotPassword()

  return (
    <>
      <Heading as="h1" color="white" size="3xl">
        Banco de questões
      </Heading>
      <Card.Root w="full" maxW="md" mx="auto" mt={4} p={6} boxShadow="lg">
        <Card.Header>
          <Card.Title asChild>
            <Heading as="h2">Redefinir Senha</Heading>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <form id="forgot-password" onSubmit={form.handleSubmit(onSubmit)}>
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
              form="forgot-password"
            >
              Recuperar
            </Button>
            <ChakraLink width="full" textDecoration="none" asChild>
              <Link to="/auth/login">
                <Button
                  disabled={isPending}
                  type="button"
                  width="full"
                  variant="ghost"
                >
                  Voltar
                </Button>
              </Link>
            </ChakraLink>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  )
}
