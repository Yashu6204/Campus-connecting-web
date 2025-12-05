import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { mockFaculty } from '@/api/mockData';
import { Star, Send, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Feedback() {
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [doubt, setDoubt] = useState('');

  const submitFeedback = () => {
    if (!selectedFaculty || rating === 0 || !feedback) {
      toast.error('Please fill all required fields');
      return;
    }

    toast.success('Feedback submitted!', {
      description: 'Thank you for your valuable feedback',
    });
    setSelectedFaculty('');
    setRating(0);
    setFeedback('');
  };

  const submitDoubt = () => {
    if (!selectedFaculty || !doubt) {
      toast.error('Please select a faculty and enter your doubt');
      return;
    }

    toast.success('Doubt submitted!', {
      description: 'Faculty will respond to your query soon',
    });
    setDoubt('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <Star className="h-7 w-7 text-accent" />
          Faculty Feedback & Doubts
        </h1>
        <p className="text-muted-foreground">Share feedback or ask doubts to faculty members</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Feedback Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-accent" />
              Submit Feedback
            </CardTitle>
            <CardDescription>Rate and review your faculty's teaching</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Faculty</Label>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a faculty member" />
                </SelectTrigger>
                <SelectContent>
                  {mockFaculty.map(faculty => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name} - {faculty.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? 'fill-accent text-accent'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your experience and suggestions..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
            </div>

            <Button className="w-full" onClick={submitFeedback}>
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Doubts Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Ask a Doubt
            </CardTitle>
            <CardDescription>Get your academic queries resolved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Faculty</Label>
              <Select value={selectedFaculty} onValueChange={setSelectedFaculty}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a faculty member" />
                </SelectTrigger>
                <SelectContent>
                  {mockFaculty.map(faculty => (
                    <SelectItem key={faculty.id} value={faculty.id}>
                      {faculty.name} - {faculty.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doubt">Your Doubt</Label>
              <Textarea
                id="doubt"
                placeholder="Describe your academic doubt in detail..."
                value={doubt}
                onChange={(e) => setDoubt(e.target.value)}
                rows={6}
              />
            </div>

            <Button className="w-full" onClick={submitDoubt}>
              <Send className="h-4 w-4 mr-2" />
              Submit Doubt
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Queries */}
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Queries</CardTitle>
          <CardDescription>Track responses from faculty</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No queries submitted yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
