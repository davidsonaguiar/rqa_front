import {
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function QueryClientProvider(props: Props) {
  const queryClient = new QueryClient()

  return <Provider client={queryClient}>{props.children}</Provider>
}
