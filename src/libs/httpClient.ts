import axios from 'axios'
import { toaster } from '@/components/ui/toaster'

const baseURL = import.meta.env.VITE_API_URL as string

if (!baseURL) {
  throw new Error('VITE_API_URL não está definida no arquivo .env')
}

const httpClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

httpClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.log('HTTP Error:', error)
    if (error.status === 401) {
      toaster.error({
        title: 'Sessão expirada',
        description: 'Por favor, faça login novamente.',
      })
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

export { httpClient }
