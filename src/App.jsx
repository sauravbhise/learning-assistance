import { Routes, Route } from "react-router-dom"
import Register from "./components/RegisterPage"
import Login from "./components/LoginPage"
import Layout from "./components/Layout"
import DashboardPage from "./components/DashboardPage"
import Admin from "./components/Admin"
import LearningAssistant from "./components/LearningAssistant"
import StudentDashboard from "./components/student/StudentDashboard"
import UploadAssignment from "./components/student/FileUpload"
import SubmissionPage from "./components/student/SubmissionPage"
import UnauthorizedPage from "./components/UnauthorizedPage"
import NotFoundPage from "./components/NotFoundPage"
import RequireAuth from "./components/RequireAuth"
import ROLES from "./utils/roles"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Public Routes */}
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<UnauthorizedPage />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.LA, ROLES.STUDENT]} />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.LA]} />}>
          <Route path="la" element={<LearningAssistant />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.STUDENT]} />}>
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/assignments/:assignmentId/upload" element={<UploadAssignment />} />
          <Route path="student/submissions/:submissionId" element={<SubmissionPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  )
}

export default App
