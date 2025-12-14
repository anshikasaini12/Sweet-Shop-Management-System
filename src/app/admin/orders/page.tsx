import { Badge } from '@/components/ui/badge';
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

const orders = [
    {
        id: "ORD001",
        customer: "Rohan Sharma",
        date: "2024-07-25",
        total: "₹125.00",
        status: "Delivered",
        items: "Jalebi x2, Gulab Jamun x1"
    },
    {
        id: "ORD002",
        customer: "Priya Patel",
        date: "2024-07-24",
        total: "₹240.00",
        status: "Shipped",
        items: "Kaju Katli x2"
    },
    {
        id: "ORD003",
        customer: "Amit Singh",
        date: "2024-07-24",
        total: "₹90.00",
        status: "Pending",
        items: "Ladoo x2"
    },
    {
        id: "ORD004",
        customer: "Sneha Gupta",
        date: "2024-07-23",
        total: "₹100.00",
        status: "Delivered",
        items: "Rasgulla x2"
    },
];

export default function AdminOrdersPage() {
    const getStatusBadgeVariant = (status: string): "default" | "secondary" | "outline" => {
        if (status === 'Delivered') return 'default';
        if (status === 'Shipped') return 'secondary';
        return 'outline';
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>A list of recent orders from your shop.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Items</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">{order.items}</TableCell>
                <TableCell className="hidden sm:table-cell">{order.date}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell className="text-right">
                    <Badge variant={getStatusBadgeVariant(order.status)}>{order.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
