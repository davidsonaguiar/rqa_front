import { Button } from '@chakra-ui/react'
import { useNavigate } from 'react-router'

export function ExitButton() {
  const navigate = useNavigate()

  function handleExit() {
    localStorage.removeItem('token')
    navigate('/auth/login')
  }

  return (
    <Button
      colorPalette="teal"
      color="colorPalette.50"
      _hover={{ bg: 'colorPalette.700' }}
      variant="ghost"
      onClick={handleExit}
    >
      Sair
    </Button>
  )
}
