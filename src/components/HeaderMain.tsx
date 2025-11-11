import { Heading, Flex, Box, Container, HStack } from '@chakra-ui/react'
import { HeaderMainUser } from './HeaderMainUser'
import { memo } from 'react'
import { ExitButton } from './ExitButton'

export const HeaderMain = memo(function HeaderMain() {
  return (
    <Box as="header" bg="teal.600" color="white">
      <Container>
        <Flex justify="space-between" align="center" py={4}>
          <Heading as="h1" textStyle="md">
            BANCO DE QUESTÕES
          </Heading>
          <HStack gap={4}>
            <HeaderMainUser />
            <ExitButton />
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
})
