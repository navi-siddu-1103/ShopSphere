"use server";

import {
  getPersonalizedRecommendations,
  type PersonalizedRecommendationsInput,
  type PersonalizedRecommendationsOutput,
} from "@/ai/flows/personalized-recommendations";

export async function getPersonalizedRecommendationsAction(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return await getPersonalizedRecommendations(input);
}
