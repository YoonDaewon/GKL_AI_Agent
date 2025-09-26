/**
 * Converts a JSON file to a typed object
 * @param file - The JSON file to convert
 * @returns Promise that resolves to the parsed JSON object
 * @throws Error if file is not a JSON file or if parsing fails
 */
export const jsonFileToObject = async <T = unknown>(file: File): Promise<T> => {
  if (!file.type.includes("json")) {
    throw new Error("File must be a JSON file");
  }

  try {
    const text = await file.text();

    const parsed = JSON.parse(text) as T;

    return parsed;
  } catch (error) {
    throw new Error(
      `Failed to parse JSON file: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};
