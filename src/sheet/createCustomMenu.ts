/**
 * Creates a custom menu in the Google Sheets UI.
 */
export function createCustomMenu(): void {
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
