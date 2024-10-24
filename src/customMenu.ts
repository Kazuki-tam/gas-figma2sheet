import { createCustomMenu } from "./sheet/createCustomMenu";

/**
 * Custom menu
 */
declare const global: {
  [x: string]: () => void;
};

function onOpen(): void {
  createCustomMenu();
}

global.onOpen = onOpen;
