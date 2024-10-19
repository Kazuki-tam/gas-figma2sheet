import { getPropertiesService } from "../utils/getPropertiesService";
import { SYSTEM_PROMPT_DEV } from "../constants/prompt";

export async function generateCode(
  nodeData: object,
  promptText?: string
): Promise<string> {
  const OPENAI_API_KEY = getPropertiesService("OPENAI_API_KEY");
  const OPENAI_MODEL =
    getPropertiesService("OPENAI_MODEL") || "gpt-4o-mini-2024-07-18";
  const url = "https://api.openai.com/v1/chat/completions";

  let userContent = `Figma Node Data: ${JSON.stringify(nodeData)}\n\n`;
  if (promptText) {
    userContent += `User Prompt: ${promptText}\n\n`;
  }
  userContent += "Please implement accurately based on the Figma design data";
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
      model: OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT_DEV,
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
