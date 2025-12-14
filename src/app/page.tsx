import { sweets } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import SweetsClientPage from '@/components/sweets-client-page';
import type { Sweet } from '@/lib/types';

// This function simulates fetching data from a database
async function getSweetsData() {
  const imageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

  const hydratedSweets: (Sweet & { imageUrl: string, imageHint: string })[] = sweets.map(sweet => {
    const img = imageMap.get(sweet.imageId);
    return {
      ...sweet,
      imageUrl: img?.imageUrl || 'https://picsum.photos/seed/placeholder/600/400',
      imageHint: img?.imageHint || 'sweet food',
    };
  });
  
  return hydratedSweets;
}

export default async function Home() {
  const sweetsData = await getSweetsData();
  const categories = [...new Set(sweets.map(s => s.category))];
  
  return (
    <SweetsClientPage initialSweets={sweetsData} categories={categories} />
  );
}
