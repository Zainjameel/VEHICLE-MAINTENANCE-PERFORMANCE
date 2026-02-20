export type InsightRow = {
  id: number;
  insightName: string;
  projectedSavingsUsd: number;
  assignee: string | null;
  dateClosed: string | null;
  lastActive: string | null;
  twin: { id: number; name: string; address: string | null };
  creator: { id: number; name: string; position: string | null };
};

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function fetchTopInsights(limit: number): Promise<InsightRow[]> {
  const res = await fetch(`${API_BASE}/api/insights/top?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to load insights: ${res.status}`);
  return res.json();
}

export async function postCopilotAsk(question: string): Promise<{ answer: string }> {
  const res = await fetch(`${API_BASE}/api/copilot/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  // If backend errors, show something useful
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}