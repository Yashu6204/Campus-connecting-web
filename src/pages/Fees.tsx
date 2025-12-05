import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, CheckCircle2, Clock, Download, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Fees() {
  const [paymentOpen, setPaymentOpen] = useState(false);

  const feeStructure = [
    { type: 'Tuition Fee', amount: 85000, due: 'Jan 31, 2024', status: 'pending' },
    { type: 'Hostel Fee', amount: 45000, due: 'Jan 31, 2024', status: 'pending' },
    { type: 'Exam Fee', amount: 2500, due: 'Jan 15, 2024', status: 'paid' },
    { type: 'Lab Fee', amount: 5000, due: 'Dec 31, 2023', status: 'paid' },
  ];

  const paymentHistory = [
    { id: 'TXN123456', type: 'Tuition Fee - Sem 2', amount: 85000, date: 'Aug 15, 2023', status: 'success' },
    { id: 'TXN123455', type: 'Hostel Fee - Sem 2', amount: 45000, date: 'Aug 10, 2023', status: 'success' },
    { id: 'TXN123454', type: 'Lab Fee', amount: 5000, date: 'Jul 20, 2023', status: 'success' },
  ];

  const totalPending = feeStructure
    .filter(f => f.status === 'pending')
    .reduce((sum, f) => sum + f.amount, 0);

  const handlePayment = () => {
    toast.success('Redirecting to payment gateway...', {
      description: 'This is a demo - no actual payment will be processed',
    });
    setPaymentOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold flex items-center gap-2">
            <CreditCard className="h-7 w-7 text-primary" />
            Fee Payments
          </h1>
          <p className="text-muted-foreground">Manage your fee payments online</p>
        </div>
        <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
          <DialogTrigger asChild>
            <Button variant="accent" size="lg" disabled={totalPending === 0}>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay Now (₹{totalPending.toLocaleString()})
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Payment Gateway</DialogTitle>
              <DialogDescription>
                Secure payment powered by Razorpay/Stripe
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex justify-between mb-2">
                  <span>Total Amount</span>
                  <span className="font-bold">₹{totalPending.toLocaleString()}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Includes all pending fees
                </p>
              </div>
              <div className="space-y-2">
                <Label>Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Expiry</Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input placeholder="123" type="password" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                Your payment is secure and encrypted
              </div>
              <Button className="w-full" onClick={handlePayment}>
                Pay ₹{totalPending.toLocaleString()}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{totalPending.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹7,500</p>
                <p className="text-sm text-muted-foreground">Paid This Sem</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">Jan 31</p>
                <p className="text-sm text-muted-foreground">Next Deadline</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fee Structure */}
      <Card>
        <CardHeader>
          <CardTitle>Current Fee Structure</CardTitle>
          <CardDescription>Semester 3 - 2023-24</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fee Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeStructure.map((fee, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{fee.type}</TableCell>
                  <TableCell className="text-right">₹{fee.amount.toLocaleString()}</TableCell>
                  <TableCell>{fee.due}</TableCell>
                  <TableCell>
                    <Badge className={fee.status === 'paid' ? 'bg-success' : 'bg-warning'}>
                      {fee.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your recent transactions</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentHistory.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                  <TableCell>{payment.type}</TableCell>
                  <TableCell className="text-right">₹{payment.amount.toLocaleString()}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge className="bg-success">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
