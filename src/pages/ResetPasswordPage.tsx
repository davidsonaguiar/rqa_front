import { PasswordInput } from '@/components/ui/password-input'
import { useResetPasswordPage } from '@/hooks/useResetPasswordPage'
import {
  Button,
  Card,
  Field,
  Heading,
  VStack,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'
import { Link } from 'react-router'

export function ResetPasswordPage() {
  const { form, onSubmit, isPending } = useResetPasswordPage()

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
          <form id="reset-password" onSubmit={form.handleSubmit(onSubmit)}>
            <VStack gap={4}>
              <Field.Root
                required
                invalid={!!form.formState.errors.newPassword}
              >
                <Field.Label>
                  Senha <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register('newPassword', { required: true })}
                />
                <Field.ErrorText>
                  {form.formState.errors.newPassword?.message}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                required
                invalid={!!form.formState.errors.confirmNewPassword}
              >
                <Field.Label>
                  Confirme a Senha <Field.RequiredIndicator />
                </Field.Label>
                <PasswordInput
                  type="password"
                  placeholder="Digite sua senha"
                  {...form.register('confirmNewPassword', { required: true })}
                />
                <Field.ErrorText>
                  {form.formState.errors.confirmNewPassword?.message}
                </Field.ErrorText>
              </Field.Root>
            </VStack>
          </form>
        </Card.Body>

        <Card.Footer>
          <VStack gap={4} w="full">
            <Button
              disabled={isPending}
              bgColor="teal"
              type="submit"
              width="full"
              form="reset-password"
            >
              Redefinir Senha
            </Button>
            <ChakraLink width="full" title="Voltar para tela de login" asChild>
              <Link to="/auth/login">
                <Text width="full" textAlign="center">
                  Voltar
                </Text>
              </Link>
            </ChakraLink>
          </VStack>
        </Card.Footer>
      </Card.Root>
    </>
  )
}
