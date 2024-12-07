export const waitFor = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const extractJSON = (markdownText: string) => {
  const jsonRegex = /```json\n([\s\S]*?)```/;
  const match = markdownText.match(jsonRegex);

  if (match && match[1]) {
    try {
      // Parse the extracted JSON
      return JSON.parse(match[1].trim());
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }

  try {
    return JSON.parse(markdownText);
  } catch (error) {
    console.error("Error parsing entire response:", error);
    return null;
  }
};

export const extractInterviewData = (response: string) => {
  const jsonMatch = response.match(/```json([\s\S]+?)```/);
  let jsonData = null;
  if (jsonMatch) {
    jsonData = JSON.parse(jsonMatch[1].trim());
  }

  return jsonData;
};

export const fileToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });
};

export const getRandomApiKey = (apiKeys: string[]) => {
  if (!Array.isArray(apiKeys) || apiKeys.length === 0) {
    throw new Error("API keys array is empty or invalid.");
  }
  const randomIndex = Math.floor(Math.random() * apiKeys.length);
  return apiKeys[randomIndex];
};
