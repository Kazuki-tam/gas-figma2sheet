import { getPropertiesService } from "./utils/getPropertiesService";
import { getFigmaNodeData } from "./figma/getFigmaNodeData";
import { generateCode } from "./openai/generateCode";

/**
 * Converts Figma design to HTML.
 *
 * @param targetId - The ID of the target node in Figma.
 * @param promptText - Optional text to guide the code generation.
 * @param figmaFileKey - Optional Figma file key.
 * @param figmaApiToken - Optional Figma API token.
 * @returns A promise that resolves to the generated HTML code.
 */
declare const global: {
  [x: string]: (
    targetId: string,
    promptText?: string,
    figmaFileKey?: string,
    figmaApiToken?: string
  ) => Promise<string>;
};

async function FIGMA_HTML(
  targetId: string,
  promptText?: string,
  figmaFileKey?: string,
  figmaApiToken?: string
): Promise<string> {
  const FIGMA_API_TOKEN =
    figmaApiToken || getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = figmaFileKey || getPropertiesService("FIGMA_FILE_KEY");

  if (!FIGMA_API_TOKEN || !FIGMA_FILE_KEY) {
    throw new Error("Figma API token or file key is not set");
  }

  try {
    // Retrieve node data using Figma API
    const nodeData = await getFigmaNodeData(
      FIGMA_FILE_KEY,
      FIGMA_API_TOKEN,
      targetId
    );

    // Generate code using OpenAI GPT Model
    const generatedCode = await generateCode(nodeData, promptText);

    return generatedCode;
  } catch (error) {
    console.error("Error in FIGMA_HTML:", error);
    return "An error occurred. Please check the logs for details.";
  }
}

global.FIGMA_HTML = FIGMA_HTML;
