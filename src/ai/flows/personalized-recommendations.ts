'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized product recommendations based on viewed items.
 *
 * @exports {
 *   getPersonalizedRecommendations - Function to retrieve personalized product recommendations.
 *   PersonalizedRecommendationsInput - Input type for the recommendations function.
 *   PersonalizedRecommendationsOutput - Output type for the recommendations function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  viewedProductIds: z.array(z.string()).describe('An array of product IDs that the user has viewed.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendedProductIds: z.array(z.string()).describe('An array of product IDs recommended to the user.'),
  reason: z.string().describe('The reason for recommending these products based on viewed history.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert product recommendation engine for an e-commerce website.

  Based on the products the user has viewed, recommend other products that they might be interested in.
  Explain the reason for the recommendations.

  Viewed Product IDs: {{{viewedProductIds}}}
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
