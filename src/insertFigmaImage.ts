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

  if (!FIGMA_API_TOKEN || !FIGMA_FILE_KEY) {
    throw new Error("Figma API token or file key is not set");
  }

  const ui = SpreadsheetApp.getUi();
  const userLocale = Session.getActiveUserLocale();
  const isJapanese = userLocale === "ja";

  // Prompt to enter the Figma node ID
  const targetIdResponse = ui.prompt(
    isJapanese ? "Figmaノードの挿入" : "Insert Figma Node",
    isJapanese
      ? "FigmaノードのIDを入力してください(例 1:3)"
      : "Please enter the ID of the Figma node(Ex. 1:3)",
    ui.ButtonSet.OK_CANCEL
  );
  if (targetIdResponse.getSelectedButton() !== ui.Button.OK) return;

  const targetId = targetIdResponse.getResponseText();

  // Confirm whether to adjust the image size
  const resizeResponse = ui.alert(
    isJapanese ? "画像サイズの調整" : "Adjust Image Size",
    isJapanese
      ? "画像のサイズを調整しますか？"
      : "Do you want to adjust the size of the image?",
    ui.ButtonSet.YES_NO
  );

  let width: number | "auto" | undefined;
  let height: number | "auto" | undefined;

  if (resizeResponse === ui.Button.YES) {
    // Prompt to enter the image width
    const widthResponse = ui.prompt(
      isJapanese ? "画像の幅" : "Image Width",
      isJapanese
        ? "画像の幅をピクセル単位で入力してください（'auto'）"
        : "Please enter the width of the image (in pixels) ('auto')",
      ui.ButtonSet.OK_CANCEL
    );
    if (widthResponse.getSelectedButton() !== ui.Button.OK) return;
    const widthInput = widthResponse.getResponseText().trim().toLowerCase();
    width =
      widthInput === "" || widthInput === "auto"
        ? "auto"
        : Number.parseInt(widthInput, 10);

    // Prompt to enter the image height
    const heightResponse = ui.prompt(
      isJapanese ? "画像の高さ" : "Image Height",
      isJapanese
        ? "画像の高さをピクセル単位で入力してください（'auto'）"
        : "Please enter the height of the image (in pixels) ('auto')",
      ui.ButtonSet.OK_CANCEL
    );
    if (heightResponse.getSelectedButton() !== ui.Button.OK) return;
    const heightInput = heightResponse.getResponseText().trim().toLowerCase();
    height =
      heightInput === "" || heightInput === "auto"
        ? "auto"
        : Number.parseInt(heightInput, 10);
  }

  try {
    const imageUrl = getFigmaImage(targetId, FIGMA_FILE_KEY, FIGMA_API_TOKEN);

    // Insert the image into the active cell
    const activeCell = SpreadsheetApp.getActiveSpreadsheet()
      .getActiveSheet()
      .getActiveCell();
    insertImageToSheet(imageUrl, activeCell, width, height);

    ui.alert(
      isJapanese ? "成功" : "Success",
      isJapanese
        ? "Figma画像が正常に挿入されました。"
        : "The Figma image has been successfully inserted.",
      ui.ButtonSet.OK
    );
  } catch (error: unknown) {
    console.error("Error details:", error);
    if (error instanceof Error) {
      ui.alert(
        isJapanese ? "エラー" : "Error",
        isJapanese
          ? `画像の挿入中にエラーが発生しました: ${error.message}`
          : `An error occurred while inserting the image: ${error.message}`,
        ui.ButtonSet.OK
      );
    } else {
      ui.alert(
        isJapanese ? "エラー" : "Error",
        isJapanese
          ? "画像の挿入中に不明なエラーが発生しました。"
          : "An unknown error occurred while inserting the image.",
        ui.ButtonSet.OK
      );
    }
  }
}

global.insertFigmaImage = insertFigmaImage;

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const userLocale = Session.getActiveUserLocale();

  const menuTitle = "Figma2Sheet";
  let menuItemTitle1 = "Insert Figma Image";
  let menuItemTitle2 = "Insert Figma HTML";

  if (userLocale === "ja") {
    menuItemTitle1 = "Figmaから画像を挿入";
    menuItemTitle2 = "FigmaからHTMLを挿入";
  }

  ui.createMenu(menuTitle)
    .addItem(menuItemTitle1, "insertFigmaImage")
    .addItem(menuItemTitle2, "insertFigma2HTML")
    .addToUi();
}

// Add the onOpen function to the global object
global.onOpen = onOpen;
