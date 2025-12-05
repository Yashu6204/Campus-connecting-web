import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  Calendar,
  FileText,
  Users,
  MessageSquare,
  ChevronRight,
  Edit,
  ClipboardList,
} from 'lucide-react';
import { mockNotifications } from '@/api/mockData';

export default function FacultyDashboard() {
  const { profile } = useAuth();
  
  const recentNotifications = mockNotifications.slice(0, 3);

  const quickStats = [
    { label: 'Classes Today', value: '4', icon: Calendar, color: 'text-blue-500' },
    { label: 'Total Students', value: '180', icon: Users, color: 'text-green-500' },
    { label: 'Pending Reviews', value: '12', icon: FileText, color: 'text-amber-500' },
    { label: 'Messages', value: '5', icon: MessageSquare, color: 'text-purple-500' },
  ];

  const upcomingClasses = [
    { subject: 'Data Structures', section: 'CSE-A', time: '9:00 AM', room: 'Room 201' },
    { subject: 'Algorithms', section: 'CSE-B', time: '11:00 AM', room: 'Room 305' },
    { subject: 'Database Systems', section: 'CSE-A', time: '2:00 PM', room: 'Lab 102' },
    { subject: 'Operating Systems', section: 'CSE-C', time: '4:00 PM', room: 'Room 401' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {profile?.name?.split(' ').map(n => n[0]).join('') || 'F'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl lg:text-3xl font-bold">{profile?.name || 'Faculty'}</h1>
              <p className="text-muted-foreground">{profile?.designation || 'Professor'}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary">{profile?.department || 'Computer Science'}</Badge>
                <Badge variant="outline">{profile?.email}</Badge>
              </div>
            </div>
            <Button asChild>
              <Link to="/student-corner">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

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
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Your classes for today</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{cls.subject}</p>
                      <p className="text-sm text-muted-foreground">{cls.section} • {cls.room}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{cls.time}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>Recent updates</CardDescription>
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
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Upload Results', href: '/results', icon: '📊' },
              { label: 'Student Feedback', href: '/feedback', icon: '💬' },
              { label: 'Discussions', href: '/discussions', icon: '🗣️' },
              { label: 'Guidelines', href: '/guidelines', icon: '📋' },
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
