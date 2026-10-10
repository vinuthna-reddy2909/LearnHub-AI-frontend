import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CoursesPage from './pages/CoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import CourseViewerPage from './pages/CourseViewerPage';
import QuizViewerPage from './pages/QuizViewerPage';
import QuizResultPage from './pages/QuizResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route path="student-dashboard" element={<StudentDashboard />} />
          <Route path="instructor-dashboard" element={<InstructorDashboard />} />
          <Route path="admin-dashboard" element={<AdminDashboard />} />

          <Route path="courses" element={<CoursesPage />} />
          <Route path="courses/:id" element={<CourseDetailsPage />} />
          <Route path="quiz-result/:id" element={<QuizResultPage />} />
        </Route>
        {/* Full-screen viewers are rendered outside of MainLayout */}
        <Route path="/viewer/:id" element={<CourseViewerPage />} />
        <Route path="/quiz/:id" element={<QuizViewerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
