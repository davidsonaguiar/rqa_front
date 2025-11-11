import { HeaderMain } from '@/components/HeaderMain'
import { useAuth } from '@/hooks/useAuth'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'

export function MainLayout() {
  const { isAuth, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuth) {
      navigate('/auth/login')
    }
  }, [isAuth, loading, navigate])

  console.log('MainLayout render - isAuth:', isAuth, 'loading:', loading)

  return (
    <>
      <HeaderMain />
      <Outlet />
    </>
  )
}
