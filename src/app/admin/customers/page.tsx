import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const customers = [
    {
        name: "Rohan Sharma",
        email: "rohan.sharma@example.com",
        totalSpent: "₹1,250.00",
        orders: 5,
        since: "2024-05-10"
    },
    {
        name: "Priya Patel",
        email: "priya.patel@example.com",
        totalSpent: "₹2,400.00",
        orders: 8,
        since: "2024-03-22"
    },
    {
        name: "Amit Singh",
        email: "amit.singh@example.com",
        totalSpent: "₹900.50",
        orders: 3,
        since: "2024-06-01"
    },
    {
        name: "Sneha Gupta",
        email: "sneha.gupta@example.com",
        totalSpent: "₹3,100.00",
        orders: 12,
        since: "2024-01-15"
    }
]

export default function AdminCustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>
          View and manage your customer base.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Total Spent</TableHead>
              <TableHead className="hidden sm:table-cell">Orders</TableHead>
              <TableHead className="hidden md:table-cell">Member Since</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.email}>
                <TableCell>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{customer.totalSpent}</TableCell>
                <TableCell className="hidden sm:table-cell">{customer.orders}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.since}</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
