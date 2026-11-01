"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchHealth } from "@/services/health";
import { getErrorMessage } from "@/services/api";
import type { HealthResponse } from "@/types/api";

type HealthState =
  | { phase: "loading" }
  | { phase: "ready"; data: HealthResponse }
  | { phase: "error"; message: string };

export function useHealth() {
  const [state, setState] = useState<HealthState>({ phase: "loading" });

  const refresh = useCallback(async () => {
    setState({ phase: "loading" });
    try {
      setState({ phase: "ready", data: await fetchHealth() });
    } catch (error) {
      setState({ phase: "error", message: getErrorMessage(error) });
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { state, refresh };
}
