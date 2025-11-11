import {
  QueryClientProvider as Provider,
  QueryClient,
} from '@tanstack/react-query'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const queryClient = new QueryClient()

export function QueryClientProvider(props: Props) {
  return <Provider client={queryClient}>{props.children}</Provider>
}
