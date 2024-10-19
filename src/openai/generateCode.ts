import { getPropertiesService } from "../utils/getPropertiesService";

export async function generateCode(
  nodeData: object,
  promptText?: string
): Promise<string> {
  const OPENAI_API_KEY = getPropertiesService("OPENAI_API_KEY");
  const url = "https://api.openai.com/v1/chat/completions";

  let userContent = `Figma Node Data: ${JSON.stringify(nodeData)}\n\n`;
  if (promptText) {
    userContent += `User Prompt: ${promptText}\n\n`;
  }
  userContent += "Generate HTML, CSS, and JavaScript code based on this Figma design";
  if (promptText) {
    userContent += " and user prompt";
  }
  userContent += ".";

  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      model: "gpt-4o-mini-2024-07-18",
      messages: [
        {
          role: "system",
          content: "You are a skilled web developer. Generate HTML, CSS, and JavaScript code based on the provided Figma design data and user prompt if available.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();

  if (responseCode !== 200) {
    throw new Error(`OpenAI API error: ${responseCode}`);
  }

  const jsonResponse = JSON.parse(response.getContentText());
  return jsonResponse.choices[0].message.content;
}
