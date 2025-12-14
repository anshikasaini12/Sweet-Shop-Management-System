'use client'

import React from 'react';
import type { Sweet } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';

// TODO: Implement dialogs for Edit, Delete, Restock
export default function AdminControls({ sweet }: { sweet: Sweet }) {
  return (
    <div className="w-full">
        <p className="text-sm text-muted-foreground mb-4">In Stock: <span className="font-bold text-foreground">{sweet.stock}</span> units</p>
        <div className="flex w-full gap-2">
            <Button variant="outline" className="flex-1">
                <PlusCircle className="mr-2 h-4 w-4" />
                Restock
            </Button>
            <Button variant="outline" size="icon" aria-label="Edit Sweet">
                <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="destructive" size="icon" aria-label="Delete Sweet">
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    </div>
  );
}
