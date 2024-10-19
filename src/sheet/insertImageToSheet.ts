/**
 * 指定されたURLの画像を指定されたセルに挿入する
 * @param imageUrl 挿入する画像のURL
 * @param cell 画像を挿入するセル
 * @param width 画像の幅（ピクセルまたは "auto"）（オプション）
 * @param height 画像の高さ（ピクセルまたは "auto"）（オプション）
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
    // URLが有効かどうかチェック
    const response = UrlFetchApp.fetch(imageUrl);
    if (response.getResponseCode() !== 200) {
      throw new Error('画像URLが無効です');
    }

    // 画像を挿入
    const blob = response.getBlob();
    const image = sheet.insertImage(blob, column, row, 0, 0);
    
    // 元の画像のサイズを取得
    const originalWidth = image.getWidth();
    const originalHeight = image.getHeight();
    const originalAspectRatio = originalWidth / originalHeight;

    // 画像のサイズを調整
    if (typeof width === "number" && typeof height === "number") {
      // 両方指定されている場合
      image.setWidth(width);
      image.setHeight(height);
    } else if (typeof width === "number") {
      // 幅のみ指定されている場合
      image.setWidth(width);
      image.setHeight(width / originalAspectRatio);
    } else if (typeof height === "number") {
      // 高さのみ指定されている場合
      image.setHeight(height);
      image.setWidth(height * originalAspectRatio);
    }
    // どちらも指定されていないか "auto" の場合は元のサイズのまま

    console.log('画像が正常に挿入されました');
  } catch (error) {
    console.error('画像の挿入中にエラーが発生しました:', error);
    throw error;
  }
}
