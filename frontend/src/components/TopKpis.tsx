import  Card from "./Card";
import { kpis } from "../data/mock";

function formatUsd(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " USD";
}
function formatKwh(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 }) + " kWh";
}

export default function TopKpis() {
  return (
    <div className="kpis">
      <Card title="Maintenance Cost Savings" className="kpiCard" right="">
        <div className="kpiValue">{formatUsd(kpis.projectedSavingsUsd)}</div>
        <div className="kpiMeta">Estimated from completed repairs</div>
      </Card>

      <Card title="Maintenance Cost to Date" className="kpiCard" right="">
        <div className="kpiValue">{formatKwh(kpis.energyCostToDateKwh)}</div>
        <div className="kpiMeta">Fleet-wide expenses</div>
      </Card>

      <Card title="Completed Repair Tasks" className="kpiCard" right="">
        <div className="kpiValue">{kpis.successfullyActioned}</div>
        <div className="kpiMeta">Closed work orders</div>
      </Card>

      <Card title="Pending Repair Tasks" className="kpiCard" right="">
        <div className="kpiValue">{kpis.unsuccessfullyActioned}</div>
        <div className="kpiMeta">Awaiting parts or approval</div>
      </Card>
    </div>
  );
}
