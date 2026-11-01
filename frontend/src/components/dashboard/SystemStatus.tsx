"use client";

import { RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useHealth } from "@/hooks/useHealth";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3 last:border-b-0">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm font-medium">{children}</dd>
    </div>
  );
}

export function SystemStatus() {
  const { state, refresh } = useHealth();

  return (
    <Card className="w-full max-w-md">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold">System status</h2>
        <Button variant="ghost" onClick={refresh} disabled={state.phase === "loading"} aria-label="Check again">
          <RefreshCw size={16} aria-hidden /> Check again
        </Button>
      </div>

      {state.phase === "loading" && <p className="py-4 text-sm text-muted">Checking the backend…</p>}

      {state.phase === "error" && (
        <div className="py-2">
          <Badge tone="danger">Backend offline</Badge>
          <p className="mt-3 text-sm text-muted">{state.message}</p>
          <p className="mt-2 text-sm text-muted">
            Start it with <code className="text-ink">uvicorn app.main:app --reload</code> inside the backend folder.
          </p>
        </div>
      )}

      {state.phase === "ready" && (
        <dl>
          <Row label="API">
            <Badge tone={state.data.status === "ok" ? "success" : "warning"}>
              {state.data.status === "ok" ? "Running" : "Running, database unavailable"}
            </Badge>
          </Row>
          <Row label="Database">
            <Badge tone={state.data.database === "connected" ? "success" : "danger"}>
              {state.data.database === "connected" ? "Connected" : "Unreachable"}
            </Badge>
          </Row>
          <Row label="Environment">{state.data.environment}</Row>
        </dl>
      )}
    </Card>
  );
}
