import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockResults } from '@/api/mockData';
import { GraduationCap, Download, TrendingUp, Award } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Results() {
  const totalCredits = mockResults.reduce((sum, r) => sum + r.credits, 0);
  const gradePoints: Record<string, number> = {
    'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0,
  };
  
  const sgpa = mockResults.reduce((sum, r) => {
    return sum + (gradePoints[r.grade] || 0) * r.credits;
  }, 0) / totalCredits;

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-success text-success-foreground';
    if (grade.startsWith('B')) return 'bg-primary text-primary-foreground';
    if (grade.startsWith('C')) return 'bg-warning text-warning-foreground';
    return 'bg-destructive text-destructive-foreground';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-success" />
            Academic Results
          </h1>
          <p className="text-muted-foreground">View your semester-wise academic performance</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Transcript
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-3xl font-bold">{sgpa.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Current SGPA</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{totalCredits}</p>
                <p className="text-sm text-muted-foreground">Total Credits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold">{mockResults.length}</p>
                <p className="text-sm text-muted-foreground">Subjects Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Semester 3 Results - 2023-24</CardTitle>
          <CardDescription>Detailed subject-wise performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject Code</TableHead>
                <TableHead>Subject Name</TableHead>
                <TableHead className="text-center">Credits</TableHead>
                <TableHead className="text-center">Grade</TableHead>
                <TableHead className="text-center">Grade Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockResults.map((result) => (
                <TableRow key={result.id}>
                  <TableCell className="font-medium">{result.code}</TableCell>
                  <TableCell>{result.subject}</TableCell>
                  <TableCell className="text-center">{result.credits}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={getGradeColor(result.grade)}>{result.grade}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {(gradePoints[result.grade] || 0) * result.credits}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
