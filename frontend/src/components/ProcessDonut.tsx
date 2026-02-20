// @ts-nocheck
import  DonutChart, { type DonutSlice } from "./charts/DonutChart";
import { useMemo } from "react";
 

function toPercent(value: number, total: number) {
  if (!total) return "0%";
  return `${Math.round((value / total) * 100)}%`;
}

export default function ProcessDonut({  
  state,
  slices,
  colorMap,
}: {  
  state: String;
  slices: DonutSlice[];
  colorMap:Record<string, string>;
}) {
  const total = slices.reduce((a, b) => a + b.value, 0);

  

  // Match the “picture” colors
  
  return (
    <div className="processSuccess">
      <div className="donutBox">
        <DonutChart
          data={slices}
          centerTop="Monthly"
          centerBottom={state}
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
