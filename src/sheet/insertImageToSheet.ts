/**
 * Inserts an image into the specified cell or the active cell of the spreadsheet
 * @param imageUrl - The URL of the image to insert
 * @param targetCell - The cell to insert the image into (e.g., 'A1') (optional)
 * @returns The A1 notation of the cell where the image was inserted
 * @throws Error - If the operation on the spreadsheet fails
 */
export function insertImageToSheet(
  imageUrl: string,
  targetCell?: string,
  urlMode?: boolean
): string {
  try {
    // Get the active spreadsheet and sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    let cell: GoogleAppsScript.Spreadsheet.Range;

    if (targetCell) {
      // Get the specified cell
      cell = sheet.getRange(targetCell);
    } else {
      // Get the active cell
      cell = sheet.getActiveCell();
    }

    if (urlMode) {
      // Insert the image URL into the cell
      cell.setValue(imageUrl);
      return cell.getA1Notation();
    }
    // Insert the image into the cell
    cell.setFormula(`=IMAGE("${imageUrl}")`);

    // Return the A1 notation of the inserted cell
    return cell.getA1Notation();
  } catch (error: any) {
    console.error("Error in insertImageToSheet:", error);
    throw new Error(`Failed to insert image: ${error.message}`);
  }
}
