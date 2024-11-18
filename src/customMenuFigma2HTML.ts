import { getPropertiesService } from "./utils/getPropertiesService";
import { getFigmaNodeData } from "./figma/getFigmaNodeData";
import { generateCode } from "./llm/generateCode";

/**
 * Inserts Figma design as HTML code in the active cell.
 */
declare const global: {
  [x: string]: () => void;
};

async function insertFigma2HTML(): Promise<void> {
  const FIGMA_API_TOKEN = getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = getPropertiesService("FIGMA_FILE_KEY");

  if (!FIGMA_API_TOKEN || !FIGMA_FILE_KEY) {
    throw new Error("Figma API token or file key is not set");
  }

  const ui = SpreadsheetApp.getUi();
  const userLocale = Session.getActiveUserLocale();
  const isJapanese = userLocale === "ja";

  // Prompt for Figma Node
  const targetIdResponse = ui.prompt(
    isJapanese ? "FigmaノードIDの入力" : "Enter Figma Node ID",
    isJapanese
      ? "FigmaノードのIDを入力してください:"
      : "Please enter the Figma node ID:",
    ui.ButtonSet.OK_CANCEL
  );
  if (targetIdResponse.getSelectedButton() !== ui.Button.OK) return;
  const targetId = targetIdResponse.getResponseText();

  // Optional input for prompt text
  const promptTextResponse = ui.prompt(
    isJapanese
      ? "プロンプトテキストの入力（任意）"
      : "Enter Prompt Text (Optional)",
    isJapanese
      ? "コード生成のためのプロンプトテキストを入力してください（省略可）:"
      : "Please enter prompt text for code generation (optional):",
    ui.ButtonSet.OK_CANCEL
  );
  if (promptTextResponse.getSelectedButton() !== ui.Button.OK) return;
  const promptText = promptTextResponse.getResponseText();

  try {
    // Retrieve node data using Figma API
    const nodeData = await getFigmaNodeData(
      FIGMA_FILE_KEY,
      FIGMA_API_TOKEN,
      targetId
    );

    // Generate code using OpenAI GPT Model
    const generatedCode = await generateCode(nodeData, promptText);
    const activeCell = SpreadsheetApp.getActiveSpreadsheet()
      .getActiveSheet()
      .getActiveCell();
    activeCell.setValue(generatedCode);

    ui.alert(
      isJapanese ? "成功" : "Success",
      isJapanese
        ? "HTMLコードが正常に挿入されました。"
        : "HTML code has been successfully inserted.",
      ui.ButtonSet.OK
    );
  } catch (error) {
    console.error("Error in insertFigma2HTML:", error);
    ui.alert(
      isJapanese ? "エラー" : "Error",
      isJapanese
        ? "HTMLコードの生成中にエラーが発生しました。ログを確認してください。"
        : "An error occurred while generating HTML code. Please check the logs.",
      ui.ButtonSet.OK
    );
  }
}

global.insertFigma2HTML = insertFigma2HTML;
