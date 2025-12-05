import { useAuth } from '@/context/AuthContext';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import FacultyDashboard from '@/components/dashboard/FacultyDashboard';

export default function Dashboard() {
  const { role } = useAuth();
  
  if (role === 'faculty') {
    return <FacultyDashboard />;
  }
  
  return <StudentDashboard />;
}
