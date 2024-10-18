import { getFigmaImage } from "./figma/getFigmaImage";
import { insertImageToSheet } from "./sheet/insertImageToSheet";
import { getPropertiesService } from "./utils/getPropertiesService";

/**
 * Insert Fimga Image function
 */
declare const global: {
  [x: string]: (
    targetId: string,
    figmaFileKey?: string,
    figmaApiToken?: string
  ) => string;
};

function insertFigmaImage(
  targetId: string,
  figmaFileKey?: string,
  figmaApiToken?: string
): string {
  const FIGMA_API_TOKEN = figmaFileKey
    ? figmaFileKey
    : getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = figmaApiToken
    ? figmaApiToken
    : getPropertiesService("FIGMA_FILE_KEY");

  const imageUrl = getFigmaImage(targetId, FIGMA_FILE_KEY, FIGMA_API_TOKEN);
  return imageUrl;
}

global.insertFigmaImage = insertFigmaImage;
