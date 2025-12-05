import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { websiteHandlers } from '@/api/mockData';
import { Settings, Mail, Phone, ExternalLink, Globe, Server, Database, Shield } from 'lucide-react';

export default function Handlers() {
  const systemStatus = [
    { name: 'Website', status: 'operational', icon: Globe },
    { name: 'Database', status: 'operational', icon: Database },
    { name: 'Auth Server', status: 'operational', icon: Shield },
    { name: 'File Storage', status: 'maintenance', icon: Server },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" />
          Website Handlers
        </h1>
        <p className="text-muted-foreground">Contact information and system status</p>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            System Status
          </CardTitle>
          <CardDescription>Current status of campus services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {systemStatus.map((system) => (
              <div
                key={system.name}
                className="flex items-center gap-3 p-4 rounded-lg border border-border"
              >
                <system.icon className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{system.name}</p>
                </div>
                <Badge
                  className={
                    system.status === 'operational'
                      ? 'bg-success text-success-foreground'
                      : 'bg-warning text-warning-foreground'
                  }
                >
                  {system.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {websiteHandlers.map((handler) => (
          <Card key={handler.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{handler.name}</CardTitle>
              <CardDescription>{handler.responsibility}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${handler.email}`} className="text-primary hover:underline">
                  {handler.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${handler.phone}`} className="hover:text-primary">
                  {handler.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Working Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monday - Friday</span>
              <span className="font-medium">9:00 AM - 5:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Saturday</span>
              <span className="font-medium">9:00 AM - 1:00 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sunday</span>
              <span className="font-medium">Closed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              Official Website
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              Student Portal
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              ERP System
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
