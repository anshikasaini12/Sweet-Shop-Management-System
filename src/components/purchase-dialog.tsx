'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { handlePurchase } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ShoppingBag } from 'lucide-react';
import type { Sweet } from '@/lib/types';

const purchaseFormSchema = z.object({
  quantity: z.coerce.number().min(1, 'You must purchase at least 1 item.'),
});

type PurchaseDialogProps = {
  sweet: Sweet;
};

export default function PurchaseDialog({ sweet }: PurchaseDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof purchaseFormSchema>>({
    resolver: zodResolver(purchaseFormSchema),
    defaultValues: {
      quantity: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof purchaseFormSchema>) {
    const result = await handlePurchase({
      sweetName: sweet.name,
      requestedQuantity: values.quantity,
      availableStock: sweet.stock,
    });
    
    setOpen(false);
    form.reset();

    if (result.reason) {
      toast({
        title: `Order Adjusted for ${sweet.name}`,
        description: `You purchased ${result.adjustedQuantity}. ${result.reason}`,
      });
    } else {
      toast({
        title: 'Purchase Successful!',
        description: `You purchased ${result.adjustedQuantity} ${sweet.name}.`,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
            <ShoppingBag className="mr-2 h-4 w-4"/>
            Buy Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Purchase {sweet.name}</DialogTitle>
          <DialogDescription>
            Price: ₹{sweet.price} per item. Stock: {sweet.stock} available.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" max={sweet.stock > 0 ? sweet.stock : 1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Processing...' : `Purchase for ₹${sweet.price * (form.watch('quantity') || 0)}`}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
