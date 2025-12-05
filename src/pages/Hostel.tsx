import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { hostelInfo } from '@/api/mockData';
import { Building2, Phone, Clock, Users, Wifi, Shield, Coffee, Dumbbell } from 'lucide-react';

const facilityIcons: Record<string, typeof Wifi> = {
  '24/7 Security': Shield,
  'Wi-Fi': Wifi,
  'Mess': Coffee,
  'Sports Area': Dumbbell,
};

export default function Hostel() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <Building2 className="h-7 w-7 text-primary" />
          Hostel Connect
        </h1>
        <p className="text-muted-foreground">Hostel information and services</p>
      </div>

      {/* Hostel Blocks */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hostelInfo.blocks.map((block) => (
          <Card key={block.name} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{block.name}</CardTitle>
                  <CardDescription>Capacity: {block.capacity}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Warden: {block.warden}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{block.contact}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Timings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-accent" />
            Hostel Timings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">In Time</p>
              <p className="text-lg font-bold">{hostelInfo.timings.inTime}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Out Time</p>
              <p className="text-lg font-bold">{hostelInfo.timings.outTime}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Mess - Breakfast</p>
              <p className="text-lg font-bold">{hostelInfo.timings.messBreakfast}</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Mess - Lunch</p>
              <p className="text-lg font-bold">{hostelInfo.timings.messLunch}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Facilities */}
      <Card>
        <CardHeader>
          <CardTitle>Facilities</CardTitle>
          <CardDescription>Amenities available in hostels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {hostelInfo.facilities.map((facility) => {
              const Icon = facilityIcons[facility] || Building2;
              return (
                <Badge
                  key={facility}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5"
                >
                  <Icon className="h-3 w-3" />
                  {facility}
                </Badge>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
