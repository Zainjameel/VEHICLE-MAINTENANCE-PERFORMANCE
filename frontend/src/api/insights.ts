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

// Payload shape used for create/update.
// Backend expects nested Twin/Creator objects (we only need to send the IDs).
export type InsightUpsert = {
  insightName: string;
  projectedSavingsUsd: number;
  assignee: string | null;
  dateClosed: string | null; // ISO string or null
  lastActive: string | null; // ISO string or null
  twin: { id: number };
  creator: { id: number };
};

export type LookupOption = { id: number; name: string };


const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

export async function fetchTopInsights(limit: number): Promise<InsightRow[]> {
  const res = await fetch(`${API_BASE}/api/insights/top?limit=${limit}`);
  if (!res.ok) throw new Error(`Failed to load insights: ${res.status}`);
  return res.json();
}

export async function fetchAllInsights(): Promise<InsightRow[]> {
  const res = await fetch(`${API_BASE}/api/insights`);
  if (!res.ok) throw new Error(`Failed to load insights: ${res.status}`);
  return res.json();
}

export async function createInsight(payload: InsightUpsert): Promise<InsightRow> {
  const res = await fetch(`${API_BASE}/api/insights`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Create failed: ${res.status}`);
  }

  return res.json();
}

export async function updateInsight(id: number, payload: InsightUpsert): Promise<InsightRow> {
  const res = await fetch(`${API_BASE}/api/insights/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Update failed: ${res.status}`);
  }

  return res.json();
}

export async function deleteInsight(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/api/insights/${id}`, { method: "DELETE" });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Delete failed: ${res.status}`);
  }
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

export async function fetchTwins(): Promise<LookupOption[]> {
  const res = await fetch(`${API_BASE}/api/lookups/twins`);
  if (!res.ok) throw new Error(`Failed to load twins: ${res.status}`);
  return res.json();
}

export async function fetchCreators(): Promise<LookupOption[]> {
  const res = await fetch(`${API_BASE}/api/lookups/creators`);
  if (!res.ok) throw new Error(`Failed to load creators: ${res.status}`);
  return res.json();
}