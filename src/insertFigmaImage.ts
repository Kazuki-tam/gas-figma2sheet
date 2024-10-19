import { getFigmaImage } from "./figma/getFigmaImage";
import { getPropertiesService } from "./utils/getPropertiesService";

/**
 * Insert Fimga Image function
 */
declare const global: {
  [x: string]: () => void;
};

function insertFigmaImage(): void {
  const FIGMA_API_TOKEN = getPropertiesService("FIGMA_API_TOKEN");
  const FIGMA_FILE_KEY = getPropertiesService("FIGMA_FILE_KEY");

  const targetId = "";

  const imageUrl = getFigmaImage(targetId, FIGMA_FILE_KEY, FIGMA_API_TOKEN);
}

global.insertFigmaImage = insertFigmaImage;
