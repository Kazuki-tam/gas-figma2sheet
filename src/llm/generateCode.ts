import { getAIConfig } from "../utils/getAIConfig";
import { SYSTEM_PROMPT_DEV } from "../constants/prompt";
import { AI_PROVIDERS } from "../constants/llm-models";

/**
 * Generates code based on Figma node data and an optional user prompt using OpenAI's API.
 *
 * @param {object} nodeData - The data representing a Figma node.
 * @param {string} [promptText] - An optional prompt text provided by the user.
 * @returns {Promise<string>} - A promise that resolves to the generated code as a string.
 * @throws {Error} - Throws an error if the OpenAI API response is not successful.
 */
export async function generateCode(
  nodeData: object,
  promptText?: string
): Promise<string> {
  // Check if the user prompt is provided
  const aiConfig = getAIConfig();

  // Prepare the user content to be sent to the AI model
  let userContent = `Figma Node Data: ${JSON.stringify(nodeData)}\n\n`;
  if (promptText) {
    userContent += `User Prompt: ${promptText}\n\n`;
  }
  userContent += "Please implement accurately based on the Figma design data";
  if (promptText) {
    userContent += " and user prompt";
  }
  userContent += ".";

  // Generate the code using the OpenAI API
  if (aiConfig.provider === AI_PROVIDERS.OPENAI) {
    const url = "https://api.openai.com/v1/chat/completions";
    const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
      method: "post",
      headers: {
        Authorization: `Bearer ${aiConfig.apiKey}`,
        "Content-Type": "application/json",
      },
      payload: JSON.stringify({
        model: aiConfig.model,
        temperature: 0.2,
        messages: [
          { role: "system", content: SYSTEM_PROMPT_DEV },
          { role: "user", content: userContent },
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

  // Generate the code using the Gemini API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${aiConfig.model}:generateContent`;
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: "post",
    headers: {
      Authorization: `Bearer ${aiConfig.apiKey}`,
      "Content-Type": "application/json",
    },
    payload: JSON.stringify({
      contents: [
        {
          parts: [{ text: SYSTEM_PROMPT_DEV }, { text: userContent }],
        },
      ],
      generationConfig: {
        temperature: 0.2,
      },
    }),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();

  if (responseCode !== 200) {
    throw new Error(`Gemini API error: ${responseCode}`);
  }

  const jsonResponse = JSON.parse(response.getContentText());
  return jsonResponse.candidates[0].content.parts[0].text;
}
