import { getPropertiesService } from "../utils/getPropertiesService";
import { SYSTEM_PROMPT_QA } from "../constants/prompt";

/**
 * Generates a question-and-answer response based on the provided Figma node data and user prompt.
 *
 * @param {object} nodeData - The data representing a Figma node.
 * @param {string} [promptText] - An optional prompt text provided by the user.
 * @returns {Promise<string>} - A promise that resolves to the generated code as a string.
 * @throws {Error} - Throws an error if the OpenAI API response is not successful.
 */
export async function generateQA(
  nodeData: object,
  promptText: string
): Promise<string> {
  const OPENAI_API_KEY = getPropertiesService("OPENAI_API_KEY");
  const OPENAI_MODEL =
    getPropertiesService("OPENAI_MODEL") || "gpt-4o-mini-2024-07-18";

  if (!OPENAI_API_KEY) {
    throw new Error("OpenAI API key is missing");
  }

  if (!promptText) {
    throw new Error("User prompt is required for QA generation");
  }

  const url = "https://api.openai.com/v1/chat/completions";

  let userContent = `Figma Node Data: ${JSON.stringify(nodeData)}\n\n`;
  if (promptText) {
    userContent += `User Prompt: ${promptText}\n\n`;
  }
  userContent +=
    "Please provide a thoughtful and personalized response to the user's question.";
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
      temperature: 0.6,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT_QA,
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
