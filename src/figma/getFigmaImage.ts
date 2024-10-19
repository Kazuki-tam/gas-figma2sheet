interface FigmaImageResponse {
  err: string | null;
  images: {
    [key: string]: string;
  };
}

/**
 * Retrieves the image URL of a specific frame or layer in Figma
 * @param targetId - The ID of the frame or layer to retrieve
 * @param figmaFileKey - The key of the Figma file
 * @param figmaApiToken - Figma API token
 * @returns The URL of the image
 * @throws Error - If the API call fails or the ID is not found
 */
export function getFigmaImage(
  targetId: string,
  figmaFileKey: string,
  figmaApiToken: string
): string {
  try {
    // Request to export the image
    const imageResponse = UrlFetchApp.fetch(
      `https://api.figma.com/v1/images/${figmaFileKey}?ids=${targetId}&format=jpg`,
      {
        headers: {
          "X-Figma-Token": figmaApiToken,
        },
        muteHttpExceptions: true,
      }
    );

    const responseCode = imageResponse.getResponseCode();
    if (responseCode !== 200) {
      throw new Error(`API request failed with status ${responseCode}`);
    }

    const imageData = JSON.parse(
      imageResponse.getContentText()
    ) as FigmaImageResponse;

    if (imageData.err) {
      throw new Error(`Figma API error: ${imageData.err}`);
    }

    const imageUrl = imageData.images[targetId];
    if (!imageUrl) {
      throw new Error(`No image found for ID: ${targetId}`);
    }

    return imageUrl;
  } catch (error) {
    console.error("Error in getFigmaImage:", error);
    throw error;
  }
}
