import { getPropertiesService } from "./utils/getPropertiesService";
import { getFigmaNodeData } from "./figma/getFigmaNodeData";
import { generateQA } from "./openai/generateQA";

/**
 * Answers questions about Figma design.
 *
 * @param targetId - The ID of the target node in Figma.
 * @param promptText - Optional text to prompt the AI.
 * @param figmaFileKey - Optional Figma file key.
 * @param figmaApiToken - Optional Figma API token.
 * @returns The AI-generated answer.
 */
declare const global: {
  [x: string]: (
    targetId: string,
    promptText: string,
    figmaFileKey?: string,
    figmaApiToken?: string
  ) => Promise<string>;
};

async function FIGMA_QA(
  targetId: string,
  promptText: string,
  figmaFileKey?: string,
  figmaApiToken?: string
): Promise<string> {
  const FIGMA_API_TOKEN =
    figmaApiToken || getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = figmaFileKey || getPropertiesService("FIGMA_FILE_KEY");

  if (!FIGMA_API_TOKEN || !FIGMA_FILE_KEY) {
    throw new Error("Figma API token or file key is not set");
  }

  if (!targetId) {
    throw new Error("Target ID is required for Figma QA");
  }

  if (!promptText) {
    throw new Error("Prompt text is required for Figma QA");
  }

  try {
    // Retrieve node data using Figma API
    const nodeData = await getFigmaNodeData(
      FIGMA_FILE_KEY,
      FIGMA_API_TOKEN,
      targetId
    );

    // Generate QA using OpenAI GPT Model
    const generatedAnswer = await generateQA(nodeData, promptText);

    return generatedAnswer;
  } catch (error) {
    console.error("Error in FIGMA_QA:", error);
    return "An error occurred. Please check the logs for details.";
  }
}

global.FIGMA_QA = FIGMA_QA;
