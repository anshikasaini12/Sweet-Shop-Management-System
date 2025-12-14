'use server';
/**
 * @fileOverview Adjusts the sweet purchase quantity based on available stock.
 *
 * - updatePurchaseBasedOnStock - A function that handles the purchase quantity adjustment.
 * - UpdatePurchaseBasedOnStockInput - The input type for the updatePurchaseBasedOnStock function.
 * - UpdatePurchaseBasedOnStockOutput - The return type for the updatePurchaseBasedOnStock function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpdatePurchaseBasedOnStockInputSchema = z.object({
  sweetName: z.string().describe('The name of the sweet being purchased.'),
  requestedQuantity: z.number().describe('The quantity of the sweet requested by the user.'),
  availableStock: z.number().describe('The current available stock of the sweet.'),
});
export type UpdatePurchaseBasedOnStockInput = z.infer<
  typeof UpdatePurchaseBasedOnStockInputSchema
>;

const UpdatePurchaseBasedOnStockOutputSchema = z.object({
  adjustedQuantity: z
    .number()
    .describe(
      'The adjusted quantity of the sweet to purchase, based on available stock. If the requested quantity is less than or equal to the available stock, the adjusted quantity is the same as the requested quantity. If the requested quantity exceeds the available stock, the adjusted quantity is equal to the available stock.'
    ),
  reason: z
    .string()
    .optional()
    .describe(
      'The reason for the adjusted quantity, if the requested quantity was adjusted due to insufficient stock.'
    ),
});
export type UpdatePurchaseBasedOnStockOutput = z.infer<
  typeof UpdatePurchaseBasedOnStockOutputSchema
>;

export async function updatePurchaseBasedOnStock(
  input: UpdatePurchaseBasedOnStockInput
): Promise<UpdatePurchaseBasedOnStockOutput> {
  return updatePurchaseBasedOnStockFlow(input);
}

const prompt = ai.definePrompt({
  name: 'updatePurchaseBasedOnStockPrompt',
  input: {schema: UpdatePurchaseBasedOnStockInputSchema},
  output: {schema: UpdatePurchaseBasedOnStockOutputSchema},
  prompt: `You are an assistant that helps to adjust the quantity of sweets a user can purchase based on the available stock.

  If the requested quantity ({{{requestedQuantity}}}) is less than or equal to the available stock ({{{availableStock}}}), the adjusted quantity should be the same as the requested quantity.  If the requested quantity exceeds the available stock, the adjusted quantity should be equal to the available stock.

  Return a reason only if the adjusted quantity differs from the requested quantity.  The reason should clearly explain that the available stock is less than what was requested and the quantity was therefore limited to available stock.

  Sweet name: {{{sweetName}}}
`,
});

const updatePurchaseBasedOnStockFlow = ai.defineFlow(
  {
    name: 'updatePurchaseBasedOnStockFlow',
    inputSchema: UpdatePurchaseBasedOnStockInputSchema,
    outputSchema: UpdatePurchaseBasedOnStockOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
