import { getFigmaImage } from "./figma/getFigmaImage";
import { insertImageToSheet } from "./sheet/insertImageToSheet";
import { getPropertiesService } from "./utils/getPropertiesService";

/**
 * Insert Fimga Image function
 */
declare const global: {
  [x: string]: (
    targetId: string,
    outputCell?: string,
    figmaFileKey?: string,
    figmaApiToken?: string
  ) => void;
};

function insertFigmaImage(
  targetId: string,
  outputCell?: string,
  figmaFileKey?: string,
  figmaApiToken?: string
): void {
  const FIGMA_API_TOKEN = figmaFileKey
    ? figmaFileKey
    : getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = figmaApiToken
    ? figmaApiToken
    : getPropertiesService("FIGMA_FILE_KEY");

  const imageUrl = getFigmaImage("1:7", FIGMA_FILE_KEY, FIGMA_API_TOKEN);
  insertImageToSheet(imageUrl, outputCell);
  console.log(imageUrl);
}

global.insertFigmaImage = insertFigmaImage;
