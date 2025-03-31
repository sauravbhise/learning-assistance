import { Routes, Route } from "react-router-dom"
import RegisterPage from "./components/RegisterPage"
import Login from "./components/LoginPage"
import Layout from "./components/Layout"
import DashboardPage from "./components/DashboardPage"
import Admin from "./components/admin/Admin"
import LearningAssistant from "./components/la/LearningAssistantDashboard"
import AddStudentPage from "./components/la/AddStudentPage"
import AddAssignmentPage from "./components/la/AddAssignmentPage"
import EvaluationPage from "./components/la/EvaluationPage"
import StudentDashboard from "./components/student/StudentDashboard"
import AddSubmissionPage from "./components/student/AddSubmissionPage"
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
        <Route path="register" element={<RegisterPage />} />
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
          <Route path="la/addStudent" element={<AddStudentPage />} />
          <Route path="la/addAssignment" element={<AddAssignmentPage />} />
          <Route path="la/evaluate/:submissionId" element={<EvaluationPage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.STUDENT]} />}>
          <Route path="student" element={<StudentDashboard />} />
          <Route path="student/assignments/:assignmentId/upload" element={<AddSubmissionPage />} />
          <Route path="student/assignments/:assignmentId/submission" element={<SubmissionPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Route>
    </Routes>
  )
}

export default App
