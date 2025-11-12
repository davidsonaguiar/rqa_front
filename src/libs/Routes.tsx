import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from '../pages/HomePage'
import { RegisterPage } from '@/pages/RegisterPage'
import { AuthLayout } from '@/layouts/AuthLayout'
import { LoginPage } from '@/pages/LoginPage'
import { MainLayout } from '@/layouts/MainLayout'
import { ForgetPasswordPage } from '@/pages/ForgotPasswordPage'
import { ResetPasswordPage } from '@/pages/ResetPasswordPage'
import { CreateQuestionPage } from '@/pages/CreateQuestionPage'
import { QuestionDetailsPage } from '@/pages/QuestionDetailsPage'

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="create-question" element={<CreateQuestionPage />} />
          <Route path="question/:id" element={<QuestionDetailsPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgetPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
