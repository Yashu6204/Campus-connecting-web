import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  TrendingUp,
  User,
  ChevronRight,
} from 'lucide-react';
import { mockNotifications, mockSemesterResults } from '@/api/mockData';

export default function StudentDashboard() {
  const { profile } = useAuth();
  
  const recentNotifications = mockNotifications.slice(0, 3);
  const latestResult = mockSemesterResults[0];

  const quickStats = [
    { label: 'Attendance', value: '85%', icon: Calendar, color: 'text-green-500' },
    { label: 'CGPA', value: '8.5', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Pending Fees', value: '₹0', icon: FileText, color: 'text-amber-500' },
    { label: 'Assignments', value: '3', icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome back, {profile?.name?.split(' ')[0] || 'Student'}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your academics today.
          </p>
        </div>
        <Button asChild>
          <Link to="/student-corner">
            <User className="h-4 w-4 mr-2" />
            View Profile
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Recent Notifications
              </CardTitle>
              <CardDescription>Stay updated with campus news</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/notifications">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    notification.type === 'urgent' ? 'bg-destructive' :
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-amber-500' : 'bg-primary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
                  </div>
                  {notification.type === 'urgent' && (
                    <Badge variant="destructive" className="text-xs">Urgent</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Latest Result */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Latest Results
              </CardTitle>
              <CardDescription>Your academic performance</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/results">
                View all <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {latestResult && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div>
                    <p className="font-semibold">{latestResult.semester}</p>
                    <p className="text-sm text-muted-foreground">Academic Year {latestResult.year}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-primary">{latestResult.sgpa}</p>
                    <p className="text-xs text-muted-foreground">SGPA</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {latestResult.subjects.slice(0, 4).map((subject) => (
                    <div key={subject.name} className="p-2 rounded bg-muted/50 text-sm">
                      <p className="truncate font-medium">{subject.name}</p>
                      <p className="text-muted-foreground">Grade: {subject.grade}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Canteen', href: '/canteen', icon: '🍽️' },
              { label: 'Complaints', href: '/complaints', icon: '📝' },
              { label: 'Exam Cell', href: '/exam-cell', icon: '📋' },
              { label: 'Fee Payment', href: '/fees', icon: '💳' },
            ].map((item) => (
              <Button key={item.label} variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to={item.href}>
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
