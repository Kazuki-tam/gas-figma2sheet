/**
 * Fetches data for a specific node from a Figma file using the Figma API.
 *
 * @param fileKey - The key of the Figma file.
 * @param apiToken - The API token for authenticating with the Figma API.
 * @param nodeId - The ID of the node to fetch data for.
 * @returns A promise that resolves to an object containing the document, components, and styles of the specified node.
 * @throws Will throw an error if the Figma API response code is not 200.
 */
export function getFigmaNodeData(
  fileKey: string,
  apiToken: string,
  nodeId: string
): Promise<{
  [key: string]: { document: object; components: object; styles: object };
}> {
  const url = `https://api.figma.com/v1/files/${fileKey}/nodes?ids=${nodeId}`;
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "get",
    headers: {
      "X-Figma-Token": apiToken,
    },
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();

  if (responseCode !== 200) {
    throw new Error(`Figma API error: ${responseCode}`);
  }

  const jsonResponse = JSON.parse(response.getContentText());
  return jsonResponse.nodes[nodeId];
}
