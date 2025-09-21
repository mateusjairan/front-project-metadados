import type { TranscriptionSegment } from "@/types/transcription";

function shouldRemoveTimestamp(): boolean {
  const removeTimestampCheckbox = document.getElementById('check-timestamp') as HTMLInputElement;
  return removeTimestampCheckbox?.checked ?? false;
}

function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function downloadTranscript(segments: TranscriptionSegment[]) {
  try {
    const removeTimestamp = shouldRemoveTimestamp();

    const segmentsData = segments.map(segment => {
      if (removeTimestamp) {
        return { text: segment.text };
      }
      return {
        start: segment.start,
        end: segment.end,
        text: segment.text,
      };
    });

    const jsonContent = JSON.stringify(segmentsData, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `transcricao-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);

  } catch (error) {
    console.error("Erro ao exportar transcrição JSON:", error);
    alert("Erro ao exportar transcrição JSON");
  }
}

export function downloadTranscriptAsTxt(segments: TranscriptionSegment[]) {
  try {
    const removeTimestamp = shouldRemoveTimestamp();

    const txtContent = segments.map(segment => {
      if (removeTimestamp) {
        return segment.text;
      }
      const timeText = `${formatTime(segment.start)} - ${formatTime(segment.end)}`;
      return `${timeText}\n${segment.text}`;
    }).join('\n\n');

    const blob = new Blob([txtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `transcricao-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 100);

  } catch (error) {
    console.error("Erro ao exportar transcrição TXT:", error);
    alert("Erro ao exportar transcrição TXT");
  }
}
