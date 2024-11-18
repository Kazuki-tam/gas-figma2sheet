import { getPropertiesService } from "@/utils/getPropertiesService";
import type { AIConfig } from "@/types/llm-models";
import { AI_PROVIDERS } from "@/constants/llm-models";

export function getAIConfig(): AIConfig {
  const openaiApiKey = getPropertiesService("OPENAI_API_KEY");
  const openaiModel = getPropertiesService("OPENAI_MODEL") || "gpt-4o-mini";
  const geminiApiKey = getPropertiesService("GEMINI_API_KEY");
  const geminiModel =
    getPropertiesService("GEMINI_MODEL") || "gemini-1.5-flash";

  // Check if both AI API keys are set
  if (openaiApiKey) {
    return {
      provider: AI_PROVIDERS.OPENAI,
      apiKey: openaiApiKey,
      model: openaiModel,
    };
  }

  // Check if Gemini AI API keys are set
  if (!geminiApiKey) {
    throw new Error("AI API keys are not configured");
  }

  return {
    provider: AI_PROVIDERS.GEMINI,
    apiKey: geminiApiKey,
    model: geminiModel,
  };
}
