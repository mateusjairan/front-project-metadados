function shouldRemoveTimestamp(): boolean {
  const removeTimestampCheckbox = document.getElementById('check-timestamp') as HTMLInputElement;
  return removeTimestampCheckbox?.checked ?? false;
}

export function downloadTranscript() {
  try {
    const removeTimestamp = shouldRemoveTimestamp();
    // Captura todos os segmentos do DOM
    const segments = Array.from(
      document.querySelectorAll('.transcription-segment')
    );

    // Função auxiliar para converter tempo "MM:SS" em segundos
    const parseTime = (timeStr: string): number => {
      const [min, sec] = timeStr.split(":").map(Number);
      return min * 60 + sec;
    };

    // Processa os dados no formato final
    const segmentsData = segments.map(segment => {
      const timeText = segment.querySelector('.segment-time')?.textContent?.trim() || "";
      const text = segment.querySelector('.segment-text')?.textContent?.trim() || "";

      if (removeTimestamp) {
        return { text };
      }

      const [startStr, endStr] = timeText.split(" - ");
      const start = parseTime(startStr);
      const end = parseTime(endStr);
      return {
        start,
        end,
        text
      };
    });

    // Gera o JSON final
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
    console.error("Erro ao exportar transcrição:", error);
    alert("Erro ao exportar transcrição");
  }
}

export function downloadTranscriptAsTxt() {
  try {
    const removeTimestamp = shouldRemoveTimestamp();
    // Captura todos os segmentos do DOM
    const segments = Array.from(
      document.querySelectorAll('.transcription-segment')
    );

    // Processa os dados no formato final
    const txtContent = segments.map(segment => {
      const timeText = segment.querySelector('.segment-time')?.textContent?.trim() || "";
      const text = segment.querySelector('.segment-text')?.textContent?.trim() || "";

      if (removeTimestamp) {
        return text;
      }
      return `${timeText}\n${text}`;
    }).join('\n\n'); // Dois quebras de linha entre segmentos

    // Gera o arquivo TXT
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
    console.error("Erro ao exportar transcrição:", error);
    alert("Erro ao exportar transcrição");
  }
}
