'use client';

import React, { useState, useMemo } from 'react';
import type { Sweet } from '@/lib/types';
import { SweetCard } from '@/components/sweet-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

type SweetsClientPageProps = {
  initialSweets: (Sweet & { imageUrl: string, imageHint: string })[];
  categories: string[];
};

export default function SweetsClientPage({ initialSweets, categories }: SweetsClientPageProps) {
  const [sweets, setSweets] = useState(initialSweets);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 150]);
  const { user } = useAuth();

  const filteredSweets = useMemo(() => {
    return sweets.filter(sweet => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || sweet.category === selectedCategory;
      const matchesPrice = sweet.price >= priceRange[0] && sweet.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [sweets, searchTerm, selectedCategory, priceRange]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-primary">Our Sweet Selection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Discover a world of authentic Indian sweets, crafted with love and the finest ingredients.
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 bg-card rounded-lg shadow-sm border">
          <div className="md:col-span-2 relative">
            <Label htmlFor="search">Search Sweets</Label>
            <Search className="absolute left-3 top-9 h-5 w-5 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search for Jalebi, Rasgulla..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 mt-1"
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category" className="mt-1">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
              <Label>Price Range (₹{priceRange[0]} - ₹{priceRange[1]})</Label>
              <Slider
                  defaultValue={[0, 150]}
                  min={0}
                  max={150}
                  step={10}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value)}
              />
          </div>
        </div>
        
        {user?.role === 'admin' && (
          <div className="flex justify-end">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Sweet
            </Button>
          </div>
        )}
      </div>

      {filteredSweets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {filteredSweets.map(sweet => (
            <SweetCard key={sweet.id} sweet={sweet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No sweets match your criteria.</p>
          <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
