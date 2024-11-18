import type { AI_PROVIDERS } from "@/constants/llm-models";

export type AIProvider = (typeof AI_PROVIDERS)[keyof typeof AI_PROVIDERS];
export interface AIConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
}
