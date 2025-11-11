import { useAuth } from '@/hooks/useAuth'
import { VStack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export function AuthLayout() {
  const { isAuth, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && isAuth) {
      navigate('/')
    }
  }, [isAuth, loading, navigate])

  return (
    <>
      <VStack
        minH="100vh"
        justify="center"
        bg="linear-gradient(to bottom, var(--chakra-colors-teal-600) 50%, var(--chakra-colors-white) 50%)"
        p={4}
      >
        <Outlet />
      </VStack>
    </>
  )
}
