import { getPropertiesService } from "@/utils/getPropertiesService";
import type { AIConfig } from "@/types/llm-models";
import { AI_PROVIDERS } from "@/constants/llm-models";

export function getAIConfig(): AIConfig {
  const openaiApiKey = getPropertiesService("OPENAI_API_KEY");
  const openaiModel = getPropertiesService("OPENAI_MODEL") || "gpt-4o-mini";
  const geminiApiKey = getPropertiesService("GEMINI_API_KEY");
  const geminiModel =
    getPropertiesService("GEMINI_MODEL") || "gemini-1.5-flash";

  // Check if both AI models are set
  if (openaiModel && geminiModel) {
    throw new Error(
      "Both AI models (OPENAI_MODEL and GEMINI_MODEL) are set. Please set only one."
    );
  }

  // Check if both AI API keys are set
  if (openaiApiKey && openaiModel) {
    return {
      provider: AI_PROVIDERS.OPENAI,
      apiKey: openaiApiKey,
      model: openaiModel,
    };
  }

  // Check if either AI API key is set
  if (!geminiApiKey || !openaiApiKey) {
    throw new Error(
      "AI API key is not set. Please set either GEMINI_API_KEY or OPENAI_API_KEY."
    );
  }

  return {
    provider: AI_PROVIDERS.GEMINI,
    apiKey: geminiApiKey,
    model: geminiModel,
  };
}
