import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Download, AlertTriangle, Clock, MapPin } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function ExamCell() {
  const examSchedule = [
    { code: 'CS301', subject: 'Data Structures', date: 'Jan 20, 2024', time: '10:00 AM', venue: 'Block A - Hall 1' },
    { code: 'CS302', subject: 'Database Management', date: 'Jan 22, 2024', time: '10:00 AM', venue: 'Block A - Hall 2' },
    { code: 'CS303', subject: 'Operating Systems', date: 'Jan 24, 2024', time: '2:00 PM', venue: 'Block B - Hall 1' },
    { code: 'CS304', subject: 'Computer Networks', date: 'Jan 26, 2024', time: '10:00 AM', venue: 'Block A - Hall 1' },
    { code: 'CS305', subject: 'Software Engineering', date: 'Jan 28, 2024', time: '2:00 PM', venue: 'Block B - Hall 2' },
  ];

  const announcements = [
    { title: 'Hall Tickets Available', date: 'Jan 10, 2024', type: 'info' },
    { title: 'Exam Guidelines Released', date: 'Jan 8, 2024', type: 'info' },
    { title: 'Revaluation Applications Open', date: 'Jan 5, 2024', type: 'warning' },
  ];

  const quickLinks = [
    { title: 'Download Hall Ticket', icon: Download },
    { title: 'Previous Year Papers', icon: FileText },
    { title: 'Exam Guidelines', icon: FileText },
    { title: 'Contact Exam Cell', icon: FileText },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <FileText className="h-7 w-7 text-primary" />
            Exam Cell
          </h1>
          <p className="text-muted-foreground">Examination schedules and resources</p>
        </div>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          Download Hall Ticket
        </Button>
      </div>

      {/* Important Notice */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <AlertTriangle className="h-6 w-6 text-warning shrink-0" />
          <div>
            <h3 className="font-semibold">Upcoming Examinations</h3>
            <p className="text-sm text-muted-foreground">
              Semester examinations start from January 20, 2024. Please download your hall tickets and review the exam guidelines.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Exam Schedule */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Examination Schedule
            </CardTitle>
            <CardDescription>Semester 3 - January 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Venue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {examSchedule.map((exam) => (
                  <TableRow key={exam.code}>
                    <TableCell className="font-medium">{exam.code}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {exam.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        {exam.time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {exam.venue}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickLinks.map((link, index) => (
                <Button key={index} variant="ghost" className="w-full justify-start">
                  <link.icon className="h-4 w-4 mr-2" />
                  {link.title}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Announcements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Announcements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {announcements.map((item, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    item.type === 'warning' ? 'bg-warning' : 'bg-primary'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
