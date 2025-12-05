import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { mockComplaints, Complaint } from '@/api/mockData';
import { AlertCircle, Plus, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Complaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: '',
  });

  const categories = ['Infrastructure', 'Facilities', 'Academic', 'Hostel', 'Canteen', 'Other'];

  const submitComplaint = () => {
    if (!newComplaint.title || !newComplaint.description || !newComplaint.category) {
      toast.error('Please fill all fields');
      return;
    }

    const complaint: Complaint = {
      id: Date.now().toString(),
      ...newComplaint,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };

    setComplaints(prev => [complaint, ...prev]);
    setNewComplaint({ title: '', description: '', category: '' });
    setDialogOpen(false);
    toast.success('Complaint submitted successfully', {
      description: 'You will be notified once it\'s resolved',
    });
  };

  const getStatusIcon = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'resolved': return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/30';
      case 'in-progress': return 'bg-primary/10 text-primary border-primary/30';
      case 'resolved': return 'bg-success/10 text-success border-success/30';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <AlertCircle className="h-7 w-7 text-warning" />
            Complaints & Queries
          </h1>
          <p className="text-muted-foreground">Submit and track your complaints</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Complaint
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit a Complaint</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll address it as soon as possible
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief title of your complaint"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newComplaint.category}
                  onValueChange={(value) => setNewComplaint(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your complaint in detail..."
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
              <Button className="w-full" onClick={submitComplaint}>
                Submit Complaint
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {complaints.map((complaint) => (
          <Card key={complaint.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold">{complaint.title}</h3>
                    <Badge variant="outline">{complaint.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{complaint.description}</p>
                  <p className="text-xs text-muted-foreground">Submitted on {complaint.date}</p>
                </div>
                <Badge className={`flex items-center gap-1 ${getStatusColor(complaint.status)}`}>
                  {getStatusIcon(complaint.status)}
                  {complaint.status.replace('-', ' ')}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {complaints.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle2 className="h-12 w-12 text-success mb-4" />
            <p className="text-lg font-medium">No complaints</p>
            <p className="text-muted-foreground">You haven't submitted any complaints yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
