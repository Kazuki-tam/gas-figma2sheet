import { getPropertiesService } from "./utils/getPropertiesService";
import { getFigmaNodeData } from "./figma/getFigmaNodeData";
import { generateQA } from "./llm/generateQA";

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
  try {
    const FIGMA_API_TOKEN =
      figmaApiToken || getPropertiesService("FIGMA_API_TOKEN");
    const FIGMA_FILE_KEY = figmaFileKey || getPropertiesService("FIGMA_FILE_KEY");

    if (!FIGMA_API_TOKEN || !FIGMA_FILE_KEY) {
      throw new Error("FigmaのAPI tokenまたはfile keyが設定されていません");
    }

    if (!targetId) {
      throw new Error("Target IDが必要です");
    }

    if (!promptText) {
      throw new Error("プロンプトテキストが必要です");
    }

    const nodeData = await getFigmaNodeData(
      FIGMA_FILE_KEY,
      FIGMA_API_TOKEN,
      targetId
    );

    const generatedAnswer = await generateQA(nodeData, promptText);
    return generatedAnswer;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '不明なエラーが発生しました';
    console.error("FIGMA_QA Error:", errorMessage);
    return `エラーが発生しました: ${errorMessage}`;
  }
}

global.FIGMA_QA = FIGMA_QA;
