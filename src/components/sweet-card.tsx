'use client';
import Image from 'next/image';
import type { Sweet } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import SweetCardActions from './sweet-card-actions';

type SweetCardProps = {
  sweet: Sweet & { imageUrl: string; imageHint: string };
};

export function SweetCard({ sweet }: SweetCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl group border-2 border-transparent hover:border-primary">
        <div className="overflow-hidden relative">
            <Image
                src={sweet.imageUrl}
                alt={sweet.name}
                width={600}
                height={400}
                className="object-cover w-full aspect-[4/3] transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={sweet.imageHint}
            />
        </div>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{sweet.name}</CardTitle>
        <CardDescription className="text-lg font-bold text-primary">₹{sweet.price}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">{sweet.description}</p>
      </CardContent>
      <CardFooter className="pt-4 mt-auto bg-slate-50/50">
        <SweetCardActions sweet={sweet} />
      </CardFooter>
    </Card>
  );
}
