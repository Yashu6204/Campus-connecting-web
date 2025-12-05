import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { campusGuidelines } from '@/api/mockData';
import { BookOpen, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const categoryIcons: Record<string, typeof BookOpen> = {
  'Dress Code': AlertTriangle,
  'Library': BookOpen,
  'Hostel': Info,
  'Labs': Info,
};

export default function Guidelines() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-primary" />
          Campus Guidelines
        </h1>
        <p className="text-muted-foreground">Rules and regulations for campus life</p>
      </div>

      {/* Important Notice */}
      <Card className="border-warning/50 bg-warning/5">
        <CardContent className="flex items-start gap-4 pt-6">
          <AlertTriangle className="h-6 w-6 text-warning shrink-0" />
          <div>
            <h3 className="font-semibold">Important Notice</h3>
            <p className="text-sm text-muted-foreground">
              All students and staff are expected to follow these guidelines strictly. 
              Violation may result in disciplinary action.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Guidelines Accordion */}
      <Accordion type="multiple" className="space-y-4">
        {campusGuidelines.map((guideline) => {
          const Icon = categoryIcons[guideline.category] || Info;
          return (
            <AccordionItem
              key={guideline.id}
              value={guideline.id}
              className="border rounded-lg px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">{guideline.category}</h3>
                    <p className="text-sm text-muted-foreground">
                      {guideline.rules.length} guidelines
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <ul className="space-y-2 ml-14">
                  {guideline.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span className="text-sm">{rule}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      {/* Additional Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Disciplinary Committee</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              For any violations or appeals, contact the Disciplinary Committee at{' '}
              <a href="mailto:discipline@lendi.edu" className="text-primary hover:underline">
                discipline@lendi.edu
              </a>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              For emergencies, call the campus security at{' '}
              <span className="font-semibold text-primary">+91 9876543299</span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
