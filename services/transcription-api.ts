import type { Video } from "@/types/video";
import { API_BASE_URL } from "@/lib/constants";

export async function createTranscription(videoFile: File): Promise<Video> {
  const formData = new FormData();
  formData.append('file', videoFile);

  try {
    const response = await fetch(`${API_BASE_URL}/transcribe/`, {
      method: 'POST',
      body: formData,
      // Note: Don't set Content-Type header when using FormData with fetch,
      // the browser will automatically set it with the correct boundary.
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({})); // try to parse error, default to empty object
      throw new Error(errorData.detail || `Failed to create transcription: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Video;
  } catch (error) {
    console.error("Error creating transcription:", error);
    throw error; // Re-throw to be caught by react-query's onError
  }
}
