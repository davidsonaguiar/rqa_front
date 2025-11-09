import { BrowserRouter, Route, Routes } from 'react-router'
import { HomePage } from '../pages/HomePage'

export function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
