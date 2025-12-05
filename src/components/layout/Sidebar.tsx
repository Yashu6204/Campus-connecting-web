import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Home,
  LayoutDashboard,
  Bell,
  Users,
  Utensils,
  MessageSquare,
  BookOpen,
  Building2,
  MessagesSquare,
  AlertCircle,
  Star,
  GraduationCap,
  FileText,
  CreditCard,
  Settings,
  X,
  ClipboardList,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Home, label: 'Home', path: '/home' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Users, label: 'Student Corner', path: '/student-corner' },
  { icon: Utensils, label: 'Canteen Connect', path: '/canteen' },
  { icon: MessageSquare, label: 'Discussions', path: '/discussions' },
  { icon: BookOpen, label: 'Campus Guidelines', path: '/guidelines' },
  { icon: Building2, label: 'Hostel Connect', path: '/hostel' },
  { icon: MessagesSquare, label: 'Chatbox', path: '/chat' },
  { icon: AlertCircle, label: 'Complaints', path: '/complaints' },
  { icon: Star, label: 'Faculty Feedback', path: '/feedback' },
  { icon: GraduationCap, label: 'Results', path: '/results' },
  { icon: ClipboardList, label: 'Admissions', path: '/admissions' },
  { icon: FileText, label: 'Exam Cell', path: '/exam-cell' },
  { icon: CreditCard, label: 'Fee Payments', path: '/fees' },
  { icon: Settings, label: 'Website Handlers', path: '/handlers' },
];

export function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
              <GraduationCap className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">LENDI</h1>
              <p className="text-xs text-sidebar-foreground/70">Campus Portal</p>
            </div>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden text-sidebar-foreground" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md'
                        : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs text-sidebar-foreground/50 text-center">
            © 2024 Lendi Institute
          </p>
        </div>
      </aside>
    </>
  );
}
