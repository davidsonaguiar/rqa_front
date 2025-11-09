import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { AuthLayout } from '@/layouts/AuthLayout'

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
