import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { mockStudents } from '@/api/mockData';
import {
  User,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  Edit,
  Download,
  Award,
  Save,
  X,
  Users,
  TrendingUp,
  Search,
} from 'lucide-react';

// Student's own profile view
function StudentProfileView() {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: profile?.name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    blood_group: profile?.blood_group || '',
    guardian_name: profile?.guardian_name || '',
    guardian_phone: profile?.guardian_phone || '',
  });

  const studentInfo = {
    rollNumber: profile?.student_id || 'LENDI2024001',
    department: profile?.department || 'Computer Science & Engineering',
    batch: profile?.batch || '2021-2025',
    semester: profile?.semester || '6th Semester',
    section: profile?.section || 'A',
    email: profile?.email || 'student@lendi.edu',
    phone: profile?.phone || '+91 9876543210',
    address: profile?.address || 'Vizianagaram, Andhra Pradesh',
    dob: profile?.date_of_birth || '15 March 2003',
    bloodGroup: profile?.blood_group || 'O+',
    guardian: profile?.guardian_name || 'Mr. John Doe Sr.',
    guardianPhone: profile?.guardian_phone || '+91 9876543200',
  };

  const achievements = [
    { title: 'Dean\'s List', year: '2023', type: 'Academic' },
    { title: 'Hackathon Winner', year: '2023', type: 'Technical' },
    { title: 'Sports Captain', year: '2022', type: 'Sports' },
  ];

  const handleEditSubmit = async () => {
    setIsLoading(true);
    try {
      await updateProfile(editForm);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadID = () => {
    const idCardContent = `
=====================================
       LENDI INSTITUTE OF ENGINEERING
              STUDENT ID CARD
=====================================

Name: ${profile?.name || 'Student Name'}
Roll Number: ${studentInfo.rollNumber}
Department: ${studentInfo.department}
Batch: ${studentInfo.batch}
Semester: ${studentInfo.semester}
Section: ${studentInfo.section}

Email: ${studentInfo.email}
Phone: ${studentInfo.phone}

Blood Group: ${studentInfo.bloodGroup}
Guardian: ${studentInfo.guardian}

=====================================
       Valid for Academic Year 2024-25
=====================================
    `;
    
    const blob = new Blob([idCardContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile?.name || 'student'}_ID_Card.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('ID Card downloaded successfully!');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <User className="h-7 w-7 text-primary" />
            Student Corner
          </h1>
          <p className="text-muted-foreground">View and manage your profile</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadID}>
            <Download className="h-4 w-4 mr-2" />
            Download ID
          </Button>
          <Dialog open={isEditing} onOpenChange={setIsEditing}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditForm({
                  name: profile?.name || '',
                  phone: profile?.phone || '',
                  address: profile?.address || '',
                  blood_group: profile?.blood_group || '',
                  guardian_name: profile?.guardian_name || '',
                  guardian_phone: profile?.guardian_phone || '',
                });
              }}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your personal information below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={editForm.address}
                    onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="blood_group">Blood Group</Label>
                  <Input
                    id="blood_group"
                    value={editForm.blood_group}
                    onChange={(e) => setEditForm({ ...editForm, blood_group: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="guardian_name">Guardian Name</Label>
                  <Input
                    id="guardian_name"
                    value={editForm.guardian_name}
                    onChange={(e) => setEditForm({ ...editForm, guardian_name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="guardian_phone">Guardian Phone</Label>
                  <Input
                    id="guardian_phone"
                    value={editForm.guardian_phone}
                    onChange={(e) => setEditForm({ ...editForm, guardian_phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button onClick={handleEditSubmit} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {profile?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{profile?.name}</h2>
              <p className="text-muted-foreground">{studentInfo.rollNumber}</p>
              <Badge className="mt-2">{studentInfo.department}</Badge>
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{studentInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{studentInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{studentInfo.address}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: 'Department', value: studentInfo.department },
                { label: 'Batch', value: studentInfo.batch },
                { label: 'Current Semester', value: studentInfo.semester },
                { label: 'Section', value: studentInfo.section },
                { label: 'Date of Birth', value: studentInfo.dob },
                { label: 'Blood Group', value: studentInfo.bloodGroup },
                { label: 'Guardian Name', value: studentInfo.guardian },
                { label: 'Guardian Phone', value: studentInfo.guardianPhone },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-muted/50">
                  <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                  <p className="font-medium">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Achievements
            </CardTitle>
            <CardDescription>Your accomplishments and recognitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-accent" />
                    </div>
                    <Badge variant="outline">{achievement.type}</Badge>
                  </div>
                  <h3 className="font-semibold">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.year}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Faculty view showing top students
function FacultyStudentView() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const topStudents = mockStudents
    .sort((a, b) => b.cgpa - a.cgpa)
    .filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Student Corner
          </h1>
          <p className="text-muted-foreground">View top performing students</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search students by name, roll number, or department..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Top Students Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStudents.length}</p>
                <p className="text-xs text-muted-foreground">Total Students</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10 text-success">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {(mockStudents.reduce((acc, s) => acc + s.cgpa, 0) / mockStudents.length).toFixed(1)}
                </p>
                <p className="text-xs text-muted-foreground">Average CGPA</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockStudents.filter(s => s.cgpa >= 9.0).length}</p>
                <p className="text-xs text-muted-foreground">Top Performers</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10 text-warning">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {[...new Set(mockStudents.map(s => s.department))].length}
                </p>
                <p className="text-xs text-muted-foreground">Departments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-accent" />
            Top Performing Students
          </CardTitle>
          <CardDescription>Students ranked by CGPA</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topStudents.map((student, index) => (
              <div
                key={student.id}
                className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'
                      } text-white`}>
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{student.name}</h3>
                    <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                    <Badge variant="outline" className="mt-1 text-xs">{student.department}</Badge>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Semester</p>
                    <p className="font-medium">{student.semester}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">CGPA</p>
                    <p className="font-bold text-primary">{student.cgpa}</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{student.email}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function StudentCorner() {
  const { role } = useAuth();
  
  if (role === 'faculty') {
    return <FacultyStudentView />;
  }
  
  return <StudentProfileView />;
}
