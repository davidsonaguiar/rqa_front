import axios from 'axios'

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
    return Promise.reject(error)
  }
)

export { httpClient }
