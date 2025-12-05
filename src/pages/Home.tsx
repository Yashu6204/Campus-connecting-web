import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  GraduationCap,
  Bell,
  Users,
  Utensils,
  MessageSquare,
  BookOpen,
  Building2,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

const features = [
  { icon: Bell, title: 'Notifications', description: 'Stay updated with campus announcements', path: '/notifications' },
  { icon: Users, title: 'Student Corner', description: 'Access your academic profile', path: '/student-corner' },
  { icon: Utensils, title: 'Canteen Connect', description: 'Order food online', path: '/canteen' },
  { icon: MessageSquare, title: 'Discussions', description: 'Connect with faculty', path: '/discussions' },
  { icon: BookOpen, title: 'Guidelines', description: 'Campus rules and regulations', path: '/guidelines' },
  { icon: Building2, title: 'Hostel Connect', description: 'Hostel information & services', path: '/hostel' },
  { icon: GraduationCap, title: 'Results', description: 'View your academic results', path: '/results' },
  { icon: CreditCard, title: 'Fee Payments', description: 'Pay fees online', path: '/fees' },
];

const stats = [
  { value: '5000+', label: 'Students' },
  { value: '200+', label: 'Faculty' },
  { value: '50+', label: 'Programs' },
  { value: '95%', label: 'Placement' },
];

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl gradient-hero p-8 lg:p-12">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm text-primary-foreground mb-4">
            <CheckCircle2 className="h-4 w-4 text-accent" />
            Welcome to LENDI Campus Portal
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold text-primary-foreground mb-4">
            Everything you need,<br />
            <span className="text-accent">in one place</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-6 max-w-lg">
            Access all campus services, manage your academics, and stay connected with the LENDI community.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="accent" size="lg" asChild>
              <Link to="/dashboard">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" asChild>
              <Link to="/notifications">View Notifications</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="text-center">
            <CardContent className="pt-6">
              <p className="text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Access */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Quick Access</h2>
            <p className="text-muted-foreground">Navigate to campus services</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <Link key={feature.path} to={feature.path}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02] group cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-1">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
