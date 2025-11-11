import { SkeletonText, VStack } from '@chakra-ui/react'

export function HeaderMainUserSkeleton() {
  return (
    <VStack align="start" gap={1}>
      <SkeletonText colorPalette="teal" width="75px" noOfLines={1} />
      <SkeletonText colorPalette="teal" width="100px" noOfLines={1} />
    </VStack>
  )
}
