import type { Video } from "@/types/video";
import type { TranscriptionSegment } from "@/types/transcription";
import { API_BASE_URL } from "@/lib/constants";

export async function getVideos(): Promise<Video[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`);
    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    // In a real app, you'd want to handle this more gracefully
    // For now, we'll return an empty array to prevent the page from crashing.
    return [];
  }
}

export async function deleteVideo(videoId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      // The API might return a message on failure
      const errorData = await response.json().catch(() => ({})); // try to parse error, default to empty object
      throw new Error(errorData.detail || `Failed to delete video: ${response.statusText}`);
    }
    // No content is expected on successful deletion
  } catch (error) {
    console.error(`Error deleting video ${videoId}:`, error);
    throw error; // Re-throw to be caught by react-query's onError
  }
}

export async function getVideoById(videoId: string): Promise<Video | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null; // Handle not found gracefully
      }
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching video ${videoId}:`, error);
    return null; // Return null to allow the page to handle the 'not found' case
  }
}

export async function getTranscriptionSegments(jsonUrl: string): Promise<TranscriptionSegment[]> {
    if (!jsonUrl) return [];
    try {
        const response = await fetch(jsonUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch transcription segments: ${response.statusText}`);
        }
        const data = await response.json();
        // The API I'm assuming returns an object with a "segments" key
        return data.segments || [];
    } catch (error) {
        console.error(`Error fetching transcription segments from ${jsonUrl}:`, error);
        return [];
    }
}

export async function updateVideo({ videoId, data }: { videoId: string, data: Partial<Pick<Video, 'nome'>> }): Promise<Video> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos/${videoId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `Failed to update video: ${response.statusText}`);
    }

    const updatedVideo = await response.json();
    return updatedVideo;
  } catch (error) {
    console.error(`Error updating video ${videoId}:`, error);
    throw error;
  }
}
