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
