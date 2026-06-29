import { GoogleDriveResponse } from "./images.interfaces.js";
import { Env } from "../../types/env.js";

export const fetchImagesFromDrive = async (env: Env): Promise<any[]> => {
  const { DRIVE_FOLDER_ID, GOOGLE_API_KEY } = env,
    query = `'${DRIVE_FOLDER_ID}' in parents and trashed = false and mimeType contains 'image/'`,
    fields = "files(id, name, mimeType)",
    url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      query,
    )}&fields=${encodeURIComponent(fields)}&key=${GOOGLE_API_KEY}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Google Drive API respondió con estatus ${response.status}: ${errorText}`,
    );
  }

  const data = (await response.json()) as GoogleDriveResponse;

  return data.files.map((file) => {
    return {
      id: file.id,
      name: file.name,
      viewUrl: `https://lh3.googleusercontent.com/d/${file.id}`,
    };
  });
};
