import { VStack } from '@chakra-ui/react'
import { Outlet } from 'react-router'

export function AuthLayout() {
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
