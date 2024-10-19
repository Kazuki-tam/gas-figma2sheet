import { getFigmaImage } from "./figma/getFigmaImage";
import { getPropertiesService } from "./utils/getPropertiesService";
import { insertImageToSheet } from "./sheet/insertImageToSheet";

/**
 * Insert Figma Image function
 */
declare const global: {
  [x: string]: () => void;
};

function insertFigmaImage(): void {
  const FIGMA_API_TOKEN = getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = getPropertiesService("FIGMA_FILE_KEY");

  const ui = SpreadsheetApp.getUi();

  // FigmaのノードIDを入力するためのプロンプト
  const targetIdResponse = ui.prompt(
    "Figmaノードの挿入",
    "FigmaノードのターゲットIDを入力してください:",
    ui.ButtonSet.OK_CANCEL
  );
  if (targetIdResponse.getSelectedButton() !== ui.Button.OK) return;

  const targetId = targetIdResponse.getResponseText();

  // 画像のサイズを調整するかどうかを確認
  const resizeResponse = ui.alert(
    "画像サイズの調整",
    "画像のサイズを調整しますか？",
    ui.ButtonSet.YES_NO
  );

  let width: number | "auto" | undefined;
  let height: number | "auto" | undefined;

  if (resizeResponse === ui.Button.YES) {
    // 画像の幅を入力するためのプロンプト
    const widthResponse = ui.prompt(
      "画像の幅",
      "画像の幅（ピクセル）を入力してください（自動調整の場合は 'auto' または空欄）:",
      ui.ButtonSet.OK_CANCEL
    );
    if (widthResponse.getSelectedButton() !== ui.Button.OK) return;
    const widthInput = widthResponse.getResponseText().trim().toLowerCase();
    width = widthInput === "" || widthInput === "auto" ? "auto" : Number.parseInt(widthInput, 10);

    // 画像の高さを入力するためのプロンプト
    const heightResponse = ui.prompt(
      "画像の高さ",
      "画像の高さ（ピクセル）を入力してください（自動調整の場合は 'auto' または空欄）:",
      ui.ButtonSet.OK_CANCEL
    );
    if (heightResponse.getSelectedButton() !== ui.Button.OK) return;
    const heightInput = heightResponse.getResponseText().trim().toLowerCase();
    height = heightInput === "" || heightInput === "auto" ? "auto" : Number.parseInt(heightInput, 10);
  }

  try {
    const imageUrl = getFigmaImage(targetId, FIGMA_FILE_KEY, FIGMA_API_TOKEN);

    // アクティブなセルに画像を挿入
    const activeCell = SpreadsheetApp.getActiveSpreadsheet()
      .getActiveSheet()
      .getActiveCell();
    insertImageToSheet(imageUrl, activeCell, width, height);

    ui.alert("成功", "Figma画像が正常に挿入されました。", ui.ButtonSet.OK);
  } catch (error: unknown) {
    console.error('エラーの詳細:', error);
    if (error instanceof Error) {
      ui.alert(
        "エラー",
        `画像の挿入中にエラーが発生しました: ${error.message}`,
        ui.ButtonSet.OK
      );
    } else {
      ui.alert(
        "エラー",
        "画像の挿入中に不明なエラーが発生しました。",
        ui.ButtonSet.OK
      );
    }
  }
}

global.insertFigmaImage = insertFigmaImage;

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu("Figma2Sheet")
    .addItem("Insert Figma Image", "insertFigmaImage")
    .addToUi();
}

// グローバルオブジェクトに onOpen 関数を追加
global.onOpen = onOpen;
