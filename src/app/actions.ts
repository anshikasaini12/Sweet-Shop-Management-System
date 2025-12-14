'use server';

import { revalidatePath } from 'next/cache';
import {
  updatePurchaseBasedOnStock,
  type UpdatePurchaseBasedOnStockInput,
  type UpdatePurchaseBasedOnStockOutput,
} from '@/ai/flows/update-purchase-based-on-stock';

export async function handlePurchase(input: UpdatePurchaseBasedOnStockInput): Promise<UpdatePurchaseBasedOnStockOutput> {
  console.log('Handling purchase for:', input.sweetName);

  // Add a small delay to simulate network latency
  await new Promise(resolve => setTimeout(resolve, 500));

  // Call the GenAI flow
  const result = await updatePurchaseBasedOnStock(input);
  
  // In a real application, you would update your database here.
  // For example:
  // const db = getDatabase();
  // await db.collection('sweets').updateOne(
  //   { name: input.sweetName },
  //   { $inc: { stock: -result.adjustedQuantity } }
  // );

  console.log('AI suggestion:', result);
  console.log(`Simulating stock update for ${input.sweetName}. New stock would be ${input.availableStock - result.adjustedQuantity}.`);
  
  // Revalidate the page to show updated stock.
  // Note: This won't visually update the stock with mock data, but it's the correct pattern for a real DB.
  revalidatePath('/');
  
  return result;
}
