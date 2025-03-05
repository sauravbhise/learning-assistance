import { Routes, Route } from "react-router-dom"
import Register from "./components/RegisterPage"
import Login from "./components/LoginPage"
import Layout from "./components/Layout"
import DashboardPage from "./components/DashboardPage"
import Admin from "./components/Admin"
import LearningAssistant from "./components/LearningAssistant"
import Student from "./components/Student"
import NotFoundPage from "./components/NotFoundPage"
import RequireAuth from "./components/RequireAuth"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="admin" element={<Admin />} />
          <Route path="la" element={<LearningAssistant />} />
          <Route path="student" element={<Student />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
