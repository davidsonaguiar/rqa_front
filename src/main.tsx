import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RoutesProvider } from './libs/Routes.tsx'
import { Provider as ChakraProvider } from './components/ui/provider.tsx'
import { QueryClientProvider } from './libs/Query.tsx'
import { Toaster } from './components/ui/toaster.tsx'
import { Theme } from '@chakra-ui/react'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <ChakraProvider>
      <Theme colorPalette="teal">
        <QueryClientProvider>
          <RoutesProvider />
        </QueryClientProvider>
        <Toaster />
      </Theme>
    </ChakraProvider>
  </StrictMode>
)
