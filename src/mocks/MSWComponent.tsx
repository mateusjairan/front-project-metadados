"use client";

import { useEffect } from "react";

// Variável para garantir que o worker seja iniciado apenas uma vez
let workerStarted = false;

export function MSWComponent() {
  useEffect(() => {
    // Roda apenas no lado do cliente e se a variável de ambiente estiver definida
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      if (workerStarted) return;

      // Importa o worker do MSW dinamicamente
      const initMsw = async () => {
        const { worker } = await import("./browser");
        // Inicia o worker com as opções de inicialização
        await worker.start({
          onUnhandledRequest: "bypass", // Permite que requisições não mockadas passem direto
        });
        workerStarted = true;
      };

      initMsw();
    }
  }, []);

  return null;
}
