// @ts-nocheck
import  DonutChart, { type DonutSlice } from "./charts/DonutChart";
import {colorMap} from "../data/mock.ts"

function toPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export default function EnergyByMonth({
  month,
  slices,
}: {
  month: string;
  slices: DonutSlice[];
}) {
  const total = slices.reduce((a, b) => a + b.value, 0);

  // Match the “picture” colors
 

  return (
    <div className="energyMonthRow">
      <div className="donutBox">
        <DonutChart
          data={slices}
          centerTop={month}
          centerBottom="Maintenance Mix"
          colorMap={colorMap}
        />
      </div>

      <div className="legendBox">
        <div className="legendList">
          {slices.map((s) => (
            <div className="legendItem" key={s.label}>
              <span
                className="legendSwatch"
                style={{ background: colorMap[s.label] ?? "#2f81f7" }}
              />
              <span className="legendLabel">{s.label}</span>
              <span className="legendValue">{toPercent(s.value, total)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
