import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockNotifications, Notification } from '@/api/mockData';
import { Bell, CheckCircle2, Filter } from 'lucide-react';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getTypeBadge = (type: Notification['type']) => {
    const styles = {
      urgent: 'bg-destructive text-destructive-foreground',
      warning: 'bg-warning text-warning-foreground',
      success: 'bg-success text-success-foreground',
      info: 'bg-primary text-primary-foreground',
    };
    return styles[type];
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <div
      className={`p-4 rounded-lg border transition-all duration-200 ${
        notification.read 
          ? 'bg-card border-border' 
          : 'bg-accent/5 border-accent/30 shadow-sm'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${
          notification.type === 'urgent' ? 'bg-destructive' :
          notification.type === 'warning' ? 'bg-warning' :
          notification.type === 'success' ? 'bg-success' : 'bg-primary'
        }`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold">{notification.title}</h3>
            <Badge className={getTypeBadge(notification.type)} variant="secondary">
              {notification.type}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{notification.date}</span>
            {!notification.read && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => markAsRead(notification.id)}
                className="text-xs"
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Mark as read
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <Bell className="h-7 w-7 text-accent" />
            Notifications
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {notifications.map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>

        <TabsContent value="unread" className="mt-4 space-y-3">
          {notifications.filter(n => !n.read).length > 0 ? (
            notifications.filter(n => !n.read).map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="h-12 w-12 text-success mb-4" />
                <p className="text-lg font-medium">All caught up!</p>
                <p className="text-muted-foreground">No unread notifications</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="urgent" className="mt-4 space-y-3">
          {notifications.filter(n => n.type === 'urgent').map(notification => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
