import { useEffect, useState } from 'react'

export function useAuth() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuth(!!token)
    setLoading(false)
  }, [])

  return { isAuth, loading }
}
