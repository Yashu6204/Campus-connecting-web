import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ClipboardList, CheckCircle2, FileText, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Admissions() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
  });

  const programs = [
    'B.Tech - Computer Science',
    'B.Tech - Electronics',
    'B.Tech - Mechanical',
    'B.Tech - Civil',
    'M.Tech - Computer Science',
    'MBA',
  ];

  const admissionStats = [
    { label: 'Total Seats', value: '1200', icon: Users },
    { label: 'Applications', value: '3500+', icon: FileText },
    { label: 'Deadline', value: 'May 31', icon: Calendar },
  ];

  const applicationSteps = [
    { step: 1, title: 'Register', description: 'Create an account', completed: true },
    { step: 2, title: 'Apply', description: 'Fill application form', completed: false },
    { step: 3, title: 'Documents', description: 'Upload required docs', completed: false },
    { step: 4, title: 'Payment', description: 'Pay application fee', completed: false },
    { step: 5, title: 'Review', description: 'Await admission decision', completed: false },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.program) {
      toast.error('Please fill all required fields');
      return;
    }
    toast.success('Application submitted!', {
      description: 'We will contact you soon regarding your application',
    });
    setFormData({ name: '', email: '', phone: '', program: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <ClipboardList className="h-7 w-7 text-primary" />
          Admissions
        </h1>
        <p className="text-muted-foreground">Apply for admission to LENDI Institute</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {admissionStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Application Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Application</CardTitle>
            <CardDescription>Start your admission process</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Program *</Label>
                  <Select
                    value={formData.program}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, program: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select program" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map(program => (
                        <SelectItem key={program} value={program}>{program}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Application Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Application Steps</CardTitle>
            <CardDescription>Track your progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {applicationSteps.map((step, index) => (
                <div key={step.step} className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full shrink-0 ${
                    step.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step.completed ? <CheckCircle2 className="h-4 w-4" /> : step.step}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${step.completed ? 'text-success' : ''}`}>{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
