import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessagesSquare, Send, Users, Circle, Search, Loader2 } from 'lucide-react';
import { mockFaculty, mockStudents } from '@/api/mockData';

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  department: string;
  lastMessage?: string;
  unread?: number;
}

export default function Chat() {
  const { user, role, profile } = useAuth();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Get contacts based on role - students see faculty, faculty see students
  const contacts: Contact[] = role === 'student' 
    ? mockFaculty.map(f => ({ id: f.id, name: f.name, email: f.email, department: f.department }))
    : mockStudents.map(s => ({ id: s.id, name: s.name, email: s.email, department: s.department }));

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fetch messages for selected contact
  useEffect(() => {
    if (!selectedContact || !user) return;

    const fetchMessages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .or(`and(sender_id.eq.${user.id},receiver_id.eq.${selectedContact.id}),and(sender_id.eq.${selectedContact.id},receiver_id.eq.${user.id})`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
      } else {
        setMessages(data || []);
      }
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to real-time messages
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          const newMessage = payload.new as Message;
          // Only add message if it's part of this conversation
          if (
            (newMessage.sender_id === user.id && newMessage.receiver_id === selectedContact.id) ||
            (newMessage.sender_id === selectedContact.id && newMessage.receiver_id === user.id)
          ) {
            setMessages(prev => [...prev, newMessage]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedContact, user]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || !selectedContact || !user) return;

    const newMessage = {
      sender_id: user.id,
      receiver_id: selectedContact.id,
      content: message.trim(),
    };

    const { error } = await supabase
      .from('chat_messages')
      .insert(newMessage);

    if (error) {
      toast.error('Failed to send message');
      console.error('Error sending message:', error);
    } else {
      setMessage('');
      
      // Simulate faculty response if student sends message
      if (role === 'student') {
        setTimeout(async () => {
          const responses = [
            'Meet me after class tomorrow.',
            'Sure, I will help you with that.',
            'Please check the notice board for details.',
            'Submit your assignment by Friday.',
            'Come to my office during office hours.',
            'I will discuss this in the next class.',
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          
          await supabase.from('chat_messages').insert({
            sender_id: selectedContact.id,
            receiver_id: user.id,
            content: randomResponse,
          });
        }, 2000);
      }
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-8rem)] animate-fade-in">
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <MessagesSquare className="h-7 w-7 text-primary" />
            Chatbox
          </h1>
          <p className="text-muted-foreground">
            {role === 'student' ? 'Message your faculty members' : 'Message your students'}
          </p>
        </div>

        <div className="flex-1 grid lg:grid-cols-3 gap-4 min-h-0">
          {/* Contact List */}
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader className="pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search contacts..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <ScrollArea className="h-full">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-border ${
                      selectedContact?.id === contact.id ? 'bg-muted' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {contact.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Circle className="absolute -bottom-0.5 -right-0.5 h-3 w-3 fill-success text-success" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{contact.department}</p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            {selectedContact ? (
              <>
                <CardHeader className="border-b border-border py-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {selectedContact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{selectedContact.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Circle className="h-2 w-2 fill-success text-success" />
                        Online • {selectedContact.department}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-hidden p-0">
                  <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                      {loading ? (
                        <div className="flex items-center justify-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        </div>
                      ) : messages.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No messages yet. Start the conversation!</p>
                        </div>
                      ) : (
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                                msg.sender_id === user?.id
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${
                                msg.sender_id === user?.id ? 'text-primary-foreground/70' : 'text-muted-foreground'
                              }`}>
                                {formatTime(msg.created_at)}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={scrollRef} />
                    </div>
                  </ScrollArea>
                </CardContent>
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage} disabled={!message.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <CardContent className="flex-1 flex flex-col items-center justify-center">
                <Users className="h-16 w-16 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Select a contact</p>
                <p className="text-muted-foreground">
                  Choose {role === 'student' ? 'a faculty member' : 'a student'} to start messaging
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
