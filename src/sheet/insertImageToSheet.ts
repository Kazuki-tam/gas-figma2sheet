/**
 * Inserts an image from the specified URL into the specified cell.
 * @param imageUrl The URL of the image to insert.
 * @param cell The cell to insert the image into.
 * @param width The width of the image (in pixels or "auto") (optional).
 * @param height The height of the image (in pixels or "auto") (optional).
 */
export function insertImageToSheet(
  imageUrl: string,
  cell: GoogleAppsScript.Spreadsheet.Range,
  width?: number | "auto",
  height?: number | "auto"
): void {
  const sheet = cell.getSheet();
  const row = cell.getRow();
  const column = cell.getColumn();

  try {
    // Check if the URL is valid
    const response = UrlFetchApp.fetch(imageUrl);
    if (response.getResponseCode() !== 200) {
      throw new Error("Invalid image URL");
    }

    // Insert the image
    const blob = response.getBlob();
    const image = sheet.insertImage(blob, column, row, 0, 0);

    // Get the original size of the image
    const originalWidth = image.getWidth();
    const originalHeight = image.getHeight();
    const originalAspectRatio = originalWidth / originalHeight;

    // Adjust the size of the image
    if (typeof width === "number" && typeof height === "number") {
      // Both width and height are specified
      image.setWidth(width);
      image.setHeight(height);
    } else if (typeof width === "number") {
      // Only width is specified
      image.setWidth(width);
      image.setHeight(width / originalAspectRatio);
    } else if (typeof height === "number") {
      // Only height is specified
      image.setHeight(height);
      image.setWidth(height * originalAspectRatio);
    }
    // If neither is specified or "auto", keep the original size

    console.log("Image inserted successfully");
  } catch (error) {
    console.error("Error occurred while inserting the image:", error);
    throw error;
  }
}
