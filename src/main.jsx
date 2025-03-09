import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import StudentDashboard from './components/student/StudentDashboard.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { AssignmentProvider } from './context/AssignmentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AssignmentProvider>
          <Routes>
            <Route path='*' element={<App />} />
          </Routes>
        </AssignmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
