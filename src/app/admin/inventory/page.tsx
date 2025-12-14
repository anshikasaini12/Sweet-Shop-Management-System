import { MoreHorizontal, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { sweets } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function AdminInventoryPage() {
  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  };

  const getStatusBadgeVariant = (stock: number): "default" | "secondary" | "destructive" => {
    if (stock === 0) return 'destructive';
    if (stock < 10) return 'secondary';
    return 'default';
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>
          Monitor and manage your product stock levels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sweets.map((sweet) => (
              <TableRow key={sweet.id}>
                <TableCell className="font-medium">{sweet.name}</TableCell>
                <TableCell>{sweet.stock} units</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(sweet.stock)}>
                    {getStockStatus(sweet.stock)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm">Restock</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
