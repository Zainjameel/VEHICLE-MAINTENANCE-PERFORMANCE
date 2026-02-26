// @ts-nocheck
import { useEffect, useState, useMemo } from "react";// React hooks for managing state and side effects
// useState → to create state variables (rows, loading, error, etc.) 
// and their setter functions (setRows, setLoading, setError, etc.)
// useEffect → to perform side effects (fetching data from API when component mounts or when 'limit' changes)
// useMemo → to memoize computed values (monthSuccess, monthUnSuccess, costSaveByCreater, costSaveByAssignee)
// These hooks are essential for handling asynchronous data fetching and user interactions in the dashboard component.


// Importing various components and utilities used in the dashboard
import Sidebar from "../components/Sidebar";
import TopKpis from "../components/TopKpis";
import Card from "../components/Card";
import ProcessDonut from "../components/ProcessDonut";
import StackedMonthlyBars from "../components/charts/StackedMonthlyBars";
import HorizontalBar from "../components/charts/HorizontalBar";
import EnergyByMonth from "../components/EnergyByMonth";
import { fetchTopInsights, createInsight, updateInsight, deleteInsight, InsightRow } from "../api/insights";
import InsightFormModal from "../components/InsightFormModal";
import { colorMapByCreater, colorMapArray, byAssignee, byCreator, monthly, energyByTypeForMonth, Limits } from "../data/mock";
import CopilotDrawer from "../components/CopilotDrawer";
import { fetchTwins, fetchCreators } from "../api/insights";
import { fetchAllInsights } from "../api/insights";



export default function DashboardPage() {


  const [rows, setRows] = useState<InsightRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<InsightRow | null>(null);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [twinOptions, setTwinOptions] = useState([]);
  const [creatorOptions, setCreatorOptions] = useState([]);
  const [showAll, setShowAll] = useState(false);

  // State variables:
  // rows → holds the fetched insights data to be displayed in the table
  // loading → indicates whether the data is currently being fetched    
  // error → holds any error message if the data fetching fails
  // limit → determines how many top insights to fetch (default is 5)
  // selected → holds the currently selected insight row for displaying details
  // copilotOpen → controls the visibility of the Copilot drawer  

  /*
  useEffect(() => {
    fetchTopInsights(limit)
      .then(setRows)
      .finally(() => setLoading(false));
  }, [limit]);
  // This useEffect hook runs when the component mounts and whenever the 'limit' state changes.
  // It calls the fetchTopInsights function with the current limit, which returns a promise.
  // When the promise resolves, it sets the fetched data into the 'rows' state variable using setRows.
  // Finally, it sets loading to false to indicate that the data fetching is complete.
  */
  const [selectedlimit, setSelectedLimit] = useState(Limits[0].value);
  const months = Object.keys(energyByTypeForMonth);
  const [selectedMonth, setSelectedMonth] = useState(months[0]);


  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = showAll
          ? await fetchAllInsights()
          : await fetchTopInsights(selectedlimit);

        setRows(data);
        setSelected(data[0] ?? null);
      } catch (e: any) {
        setError(e.message ?? "Failed to load");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedlimit, showAll]);


  useEffect(() => {
    async function loadLookups() {
      try {
        const [tw, cr] = await Promise.all([fetchTwins(), fetchCreators()]);
        setTwinOptions(tw);
        setCreatorOptions(cr);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load lookups");
      }
    }
    loadLookups();
  }, []);

  async function reloadTopAndKeepSelection(preferId?: number) {
  setLoading(true);
  setError(null);

  try {
    const data = showAll
      ? await fetchAllInsights()
      : await fetchTopInsights(selectedlimit);

    setRows(data);

    const pick =
      preferId != null ? data.find((x) => x.id === preferId) : null;

    setSelected(pick ?? data[0] ?? null);
  } catch (e: any) {
    setError(e?.message ?? "Failed to load");
  } finally {
    setLoading(false);
  }
}

  const monthSuccess = useMemo<DonutSlice[]>(
    () => monthly.map(m => ({ label: m.month, value: m.success })),
    [monthly]
  );

  const monthUnSuccess = useMemo<DonutSlice[]>(
    () => monthly.map(m => ({ label: m.month, value: m.unsuccess })),
    [monthly]
  );

  const costSaveByCreater = useMemo<DonutSlice[]>(
    () => byCreator.map(m => ({ label: m.name, value: m.value })),
    [byCreator]
  );

  const costSaveByAssignee = useMemo<DonutSlice[]>(
    () => byAssignee.map(m => ({ label: m.name, value: m.value })),
    [byAssignee]
  );


  return (
    <div className="layout">
      <Sidebar />

      <main className="main">
        <div className="headerRow">
          <div>
            <div className="hTitle">
              Vehicle Maintenance Performance
            </div>
            <div className="hSub">{months[0]} → {months[months.length - 1]} </div>
          </div>

          <button className="badge" onClick={() => setCopilotOpen(true)} type="button">
            <span className="badgeDot" />
            Copilot
          </button>
        </div>

        <TopKpis />

        <div className="grid" style={{ marginTop: 14 }}>
          <Card
            title="Donut shows Repair Tasks by Category"
            className="span-7"
            right={
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="monthSelect"
              >
                {months.map((m) => (
                  <option key={m} value={m} style={{ color: "#cc1212" }}>
                    {m}
                  </option>
                ))}
              </select>
            }
          >
            <EnergyByMonth
              month={selectedMonth}
              slices={energyByTypeForMonth[selectedMonth]}
            />
          </Card>

          <Card title="Completed vs Pending Repair Tasks" className="span-5">
            <StackedMonthlyBars data={monthly} />
          </Card>
          <Card
            title="Monthly Completed Repairs"
            className="span-6"
          >
            <ProcessDonut
              state="Completed"
              slices={monthSuccess}
              colorMap={colorMapArray}
            />
          </Card>
          <Card
            title="Monthly Pending or Failed Repairs"
            className="span-6"
          >
            <ProcessDonut
              state="Pending / Failed"
              slices={monthUnSuccess}
              colorMap={colorMapArray}
            />
          </Card>

          <Card title="Estimated Maintenance Cost Savings by Requestor" className="span-6">
            <HorizontalBar data={byCreator} valueLabel="USD" />
          </Card>

          <Card title="Estimated Cost Savings by Repair Task " className="span-6">
            <HorizontalBar data={byAssignee} valueLabel="USD" />
          </Card>
          <Card
            title="Estimated Maintenance Cost Savings by Requestor"
            className="span-6"
          >
            <ProcessDonut
              state="By Requestor"
              slices={costSaveByCreater}
              colorMap={colorMapByCreater}
            />
          </Card>
          <Card
            title="Estimated Cost Savings by Repair Task"
            className="span-6"
          >
            <ProcessDonut
              state="By Repair Task"
              slices={costSaveByAssignee}
              colorMap={colorMapByCreater}
            />
          </Card>


          <Card
            title={showAll ? "All Insights (CRUD)" : "Top Completed Repairs Insights (USD)"}
            className="span-12"
            right={
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
               {showAll && (
                <>  
                <button
                  className="badge"
                  type="button"
                  onClick={() => {
                    setFormMode("create");
                    setFormOpen(true);
                  }}
                  title="Add new insight"
                >
                  + Add
                </button>

                <button
                  className="badge"
                  type="button"
                  disabled={!selected}
                  onClick={() => {
                    if (!selected) return;
                    setFormMode("edit");
                    setFormOpen(true);
                  }}
                  title="Edit selected row"
                  style={{ opacity: selected ? 1 : 0.55 }}
                >
                  Edit
                </button>

                <button
                  className="badge"
                  type="button"
                  disabled={!selected}
                  onClick={async () => {
                    if (!selected) return;
                    if (!confirm(`Delete insight #${selected.id}?`)) return;
                    await deleteInsight(selected.id);
                    await reloadTopAndKeepSelection();
                  }}
                  title="Delete selected row"
                  style={{ opacity: selected ? 1 : 0.55 }}
                >
                  Delete
                </button>
                </>
                )}
                <button
                  className="badge badgeGreen"
                  onClick={() => setShowAll((p) => !p)}
                >
                  {showAll ? "Show Top Dashboard" : "Manage All Insights"}
                </button>
                {!showAll && (
                  <select
                    value={selectedlimit}
                    onChange={(e) => setSelectedLimit(Number(e.target.value))}
                    className="limitSelect"
                  >
                    {Limits.map((m) => (
                      <option key={m} value={m.value} style={{ color: "#cc1212" }}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            }
          >
            <div style={{ overflow: "auto" }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Insight Name</th>
                    <th>Twin</th>
                    <th>Projected Savings (USD)</th>
                    <th>Creator</th>
                    <th>Assignee</th>
                    <th>Date Ticket Closed/Completed</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={7} className="muted">Loading…</td>
                    </tr>
                  )}

                  {error && (
                    <tr>
                      <td colSpan={7} className="muted">Error: {error}</td>
                    </tr>
                  )}

                  {!loading && !error && rows.map((r) => (
                    <tr
                      key={r.id}
                      onClick={() => setSelected(r)}
                      style={{
                        cursor: "pointer",
                        outline: selected?.id === r.id ? "1px solid rgba(47,129,247,.6)" : "none",
                        background: selected?.id === r.id ? "rgba(47,129,247,.08)" : "transparent",
                      }}
                    >
                      <td>{r.insightName}</td>
                      <td className="muted">{r.twin?.name ?? "—"}</td>
                      <td>{Number(r.projectedSavingsUsd).toLocaleString()}</td>
                      <td className="muted">{r.creator?.name ?? "—"}</td>
                      <td className="muted">{r.assignee || "—"}</td>
                      <td className="muted">{r.dateClosed || "—"}</td>
                      <td className="muted">{r.lastActive || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="Twin Details" className="span-6">
            <div style={{ overflow: "auto" }}>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="muted">Twin ID</td>
                    <td>{selected?.twin?.id ?? "—"}</td>
                  </tr>
                  <tr>
                    <td className="muted">Twin Name</td>
                    <td>{selected?.twin?.name ?? "—"}</td>
                  </tr>
                  <tr>
                    <td className="muted">Twin Address</td>
                    <td>{selected?.twin?.address ?? "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
          <Card title="Creator Details" className="span-6">
            <div style={{ overflow: "auto" }}>
              <table className="table">
                <tbody>
                  <tr>
                    <td className="muted">Creator ID</td>
                    <td>{selected?.creator?.id ?? "—"}</td>
                  </tr>
                  <tr>
                    <td className="muted">Creator Name</td>
                    <td>{selected?.creator?.name ?? "—"}</td>
                  </tr>
                  <tr>
                    <td className="muted">Creator Position</td>
                    <td>{selected?.creator?.position ?? "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
      <CopilotDrawer open={copilotOpen} onClose={() => setCopilotOpen(false)} />

      <InsightFormModal
        open={formOpen}
        mode={formMode}
        initial={formMode === "edit" ? selected : null}
        twinOptions={twinOptions}
        creatorOptions={creatorOptions}
        onClose={() => setFormOpen(false)}
        onSubmit={async (payload) => {
          if (formMode === "create") {
            const created = await createInsight(payload);
            await reloadTopAndKeepSelection(created.id);
          } else {
            if (!selected) return;
            const updated = await updateInsight(selected.id, payload);
            await reloadTopAndKeepSelection(updated.id);
          }
        }}
        onDelete={
          formMode === "edit" && selected
            ? async () => {
              await deleteInsight(selected.id);
              await reloadTopAndKeepSelection();
            }
            : undefined
        }
      />
    </div>
  );
}