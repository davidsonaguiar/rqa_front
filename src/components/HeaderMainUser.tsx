import { useGetMe } from '@/hooks/useGetMe'
import { Text, VStack } from '@chakra-ui/react'
import { memo } from 'react'
import { HeaderMainUserSkeleton } from './HeaderMainUserSkeleton'

export const HeaderMainUser = memo(function HeaderMainUser() {
  const { me, isLoading } = useGetMe()

  if (isLoading) {
    return <HeaderMainUserSkeleton />
  }

  return (
    <VStack align="start" gap={0}>
      <Text fontWeight="medium" textStyle="sm">
        {me?.name}
      </Text>
      <Text textStyle="xs">{me?.email}</Text>
    </VStack>
  )
})
