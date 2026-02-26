// @ts-nocheck
import { useEffect, useMemo, useState } from "react";
import type { InsightRow, InsightUpsert } from "../api/insights";
import { assigneeOptions } from "../data/mock";

type Mode = "create" | "edit";

export default function InsightFormModal({
  open,
  mode,
  initial,
  twinOptions,
  creatorOptions,
  onClose,
  onSubmit,
  onDelete,
}: {
  open: boolean;
  mode: Mode;
  initial: InsightRow | null;
  twinOptions: { id: number; name: string }[];
  creatorOptions: { id: number; name: string }[];
  onClose: () => void;
  onSubmit: (payload: InsightUpsert) => Promise<void>;
  onDelete?: () => Promise<void>;
}) {


  const [form, setForm] = useState({
    insightName: "",
    projectedSavingsUsd: 0,
    assignee: "",
    dateClosed: "",
    lastActive: "",
    twinId: 0,
    creatorId: 0,
  });

  // Reset form whenever modal opens or selection changes
  useEffect(() => {
    if (!open) return;

    const defaultTwinId = twinOptions[0]?.id ?? 0;
    const defaultCreatorId = creatorOptions[0]?.id ?? 0;

    if (mode === "edit" && initial) {
      setForm({
        insightName: initial.insightName ?? "",
        projectedSavingsUsd: Number(initial.projectedSavingsUsd ?? 0),
        assignee: initial.assignee ?? "",
        // Backend uses LocalDateTime; easiest is send ISO string or null.
        // We keep text input so user can paste "2026-02-25T10:30:00".
        dateClosed: initial.dateClosed ?? "",
        lastActive: initial.lastActive ?? "",
        twinId: initial.twin?.id ?? defaultTwinId,
        creatorId: initial.creator?.id ?? defaultCreatorId,
      });
    } else {
      setForm({
        insightName: "",
        projectedSavingsUsd: 0,
        assignee: "",
        dateClosed: "",
        lastActive: "",
        twinId: defaultTwinId,
        creatorId: defaultCreatorId,
      });
    }
  }, [open, mode, initial?.id, twinOptions, creatorOptions]);

  const canSave = useMemo(() => {
    return form.insightName.trim().length > 0 && form.twinId > 0 && form.creatorId > 0;
  }, [form]);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSave) return;

    const payload: InsightUpsert = {
      insightName: form.insightName.trim(),
      projectedSavingsUsd: Number(form.projectedSavingsUsd || 0),
      assignee: form.assignee?.trim() ? form.assignee.trim() : null,
      dateClosed: form.dateClosed?.trim() ? form.dateClosed.trim() : null,
      lastActive: form.lastActive?.trim() ? form.lastActive.trim() : null,
      twin: { id: Number(form.twinId) },
      creator: { id: Number(form.creatorId) },
    };

    await onSubmit(payload);
    onClose();
  }

  return (
    <>
      <div className={`vmBackdrop ${open ? "open" : ""}`} onClick={onClose} />
      <aside className={`vmModal ${open ? "open" : ""}`} role="dialog" aria-modal="true">
        <div className="vmModalHeader">
          <div>
            <div className="vmModalTitle">
              {mode === "create" ? "Add Insight" : `Edit Insight #${initial?.id}`}
            </div>
            <div className="vmModalSub">Writes to the database via REST API</div>
          </div>
          <button className="vmIconBtn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form className="vmForm" onSubmit={handleSubmit}>
          <label className="vmLabel">
            Insight Name <span className="vmReq">*</span>
            <input
              className="vmInput"
              value={form.insightName}
              onChange={(e) => setForm((p) => ({ ...p, insightName: e.target.value }))}
              placeholder="e.g., Replace front brake pads"
            />
          </label>

          <div className="vmGrid2">
            <label className="vmLabel">
              Twin <span className="vmReq">*</span>
              <select
                className="vmInput"
                value={form.twinId ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, twinId: Number(e.target.value) }))}
              >
                <option value="" disabled>
                  Select twin...
                </option>

                {twinOptions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <div className="vmHint">(Options are built from existing insights)</div>
            </label>

            <label className="vmLabel">
              Creator <span className="vmReq">*</span>
              <select
                className="vmInput"
                value={form.creatorId ?? ""}
                onChange={(e) => setForm((p) => ({ ...p, creatorId: Number(e.target.value) }))}
              >
                <option value="" disabled>
                  Select creator...
                </option>

                {creatorOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <div className="vmHint">(Options are built from existing insights)</div>
            </label>
          </div>

          <div className="vmGrid2">
            <label className="vmLabel">
              Projected Savings (USD)
              <input
                className="vmInput"
                type="number"
                value={form.projectedSavingsUsd}
                onChange={(e) => setForm((p) => ({ ...p, projectedSavingsUsd: Number(e.target.value) }))}
              />
            </label>

            <label className="vmLabel">
              Assignee
              <select
                className="vmInput"
                value={form.assignee ?? ""}
                onChange={(e) =>
                  setForm((p) => ({ ...p, assignee: e.target.value || null }))
                }
              >
                <option value="">Select assignee...</option>

                {assigneeOptions.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="vmGrid2">
            <label className="vmLabel">
              Date Closed (optional)
              <input
                type="datetime-local"
                className="vmInput"
                value={form.dateClosed ? form.dateClosed.substring(0, 16) : ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    dateClosed: e.target.value
                      ? `${e.target.value}:00`
                      : null,
                  }))
                }
              />
            </label>

            <label className="vmLabel">
              Last Active (optional)
              <input
                type="datetime-local"
                className="vmInput"
                value={form.lastActive ? form.lastActive.substring(0, 16) : ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    lastActive: e.target.value
                      ? `${e.target.value}:00`
                      : null,
                  }))
                }
              />
            </label>
          </div>

          <div className="vmActions">
            {mode === "edit" && onDelete && (
              <button
                type="button"
                className="vmBtn vmDanger"
                onClick={async () => {
                  if (!confirm("Delete this insight?")) return;
                  await onDelete();
                  onClose();
                }}
              >
                Delete
              </button>
            )}

            <div style={{ flex: 1 }} />

            <button type="button" className="vmBtn" onClick={onClose}>Cancel</button>
            <button type="submit" className="vmBtn vmPrimary" disabled={!canSave}>
              {mode === "create" ? "Add" : "Save"}
            </button>
          </div>

          {!canSave && (
            <div className="vmHint" style={{ marginTop: 8 }}>
              Required: Insight Name, Twin, Creator
            </div>
          )}
        </form>
      </aside>
    </>
  );
}
