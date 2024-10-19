import { getPropertiesService } from "./utils/getPropertiesService";
import { getFigmaNodeData } from "./figma/getFigmaNodeData";
import { generateCode } from "./openai/generateCode";

/**
 * Figma to HTML function
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

  try {
    // Figma APIを使用してノードデータを取得
    const nodeData = await getFigmaNodeData(
      FIGMA_FILE_KEY,
      FIGMA_API_TOKEN,
      targetId
    );

    // OpenAI GPT-4を使用してコードを生成
    const generatedCode = await generateCode(nodeData, promptText);

    return generatedCode;
  } catch (error) {
    console.error("Error in FIGMA_HTML:", error);
    return "エラーが発生しました。詳細はログを確認してください。";
  }
}

global.FIGMA_HTML = FIGMA_HTML;
