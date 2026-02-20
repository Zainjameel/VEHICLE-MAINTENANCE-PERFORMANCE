export type Kpis = {
  projectedSavingsUsd: number;
  energyCostToDateKwh: number;
  successfullyActioned: number;
  unsuccessfullyActioned: number;
};

export type EnergyTypeSlice = {
  label: string;
  value: number; // percent or normalized share
};


export type MonthlyInsight = {
  month: string; // e.g. "Feb 2025"
  success: number;
  unsuccess: number;
};

export type BarRow = { name: string; value: number };
export type limit = { name: string; value: number };
export type InsightRow = {
  insightName: string;
  twin: string;
  projectedSavingsUsd: number;
  creator: string;
  assignee: string;
  dateClosed: string;
  lastActive: string;
};
export type ColorMap = {
   month: string;
   color: string;
};



export const colorMap: Record<string, string> = {
    "Electrical Repairs": "#2f81f7",   // blue
    "Cooling / HVAC Repairs": "#12b886", // green
    "Fluids & Lubrication": "#f59f00", // orange
    "Engine & Fuel System": "#ff6b6b",         // red
  };

export const kpis: Kpis = {
  projectedSavingsUsd: 66459,
  energyCostToDateKwh: 891_182,
  successfullyActioned: 150,
  unsuccessfullyActioned: 109,
};

export const energyByTypeForMonth: Record<string, EnergyTypeSlice[]> = {
  "Jan 2025": [
    { label: "Electrical Repairs", value: 6 },
    { label: "Cooling / HVAC Repairs", value: 7 },
    { label: "Fluids & Lubrication", value: 8 },
    { label: "Engine & Fuel System", value: 9 },
  ],
  "Feb 2025": [
    { label: "Electrical Repairs", value: 36 },
    { label: "Cooling / HVAC Repairs", value: 32 },
    { label: "Fluids & Lubrication", value: 18 },
    { label: "Engine & Fuel System", value: 14 },
  ],
  "Mar 2025": [
    { label: "Electrical Repairs", value: 44 },
    { label: "Cooling / HVAC Repairs", value: 35 },
    { label: "Fluids & Lubrication", value: 17 },
    { label: "Engine & Fuel System", value: 4 },
  ],
  "Apr 2025": [
    { label: "Electrical Repairs", value: 22 },
    { label: "Cooling / HVAC Repairs", value: 41 },
    { label: "Fluids & Lubrication", value: 17 },
    { label: "Engine & Fuel System", value: 10 },
  ],
  "May 2025": [
    { label: "Electrical Repairs", value: 1 },
    { label: "Cooling / HVAC Repairs", value: 2 },
    { label: "Fluids & Lubrication", value: 3 },
    { label: "Engine & Fuel System", value: 4 },
  ]
};

export const monthly: MonthlyInsight[] = [

  { month: "Feb 2025", success: 21, unsuccess: 1 },
  { month: "Mar 2025", success: 2, unsuccess: 1 },
  { month: "Apr 2025", success: 4, unsuccess: 6 },
  { month: "May 2025", success: 3, unsuccess: 1 },
  { month: "Jun 2025", success: 4, unsuccess: 1 },
  { month: "Jul 2025", success: 12, unsuccess: 3 },
  { month: "Aug 2025", success: 20, unsuccess: 2 },
  { month: "Sep 2025", success: 60, unsuccess: 8 },
  { month: "Oct 2025", success: 22, unsuccess: 18 },
  { month: "Nov 2025", success: 14, unsuccess: 26 },
  { month: "Dec 2025", success: 16, unsuccess: 46 },
  { month: "Jan 2026", success: 2, unsuccess: 30 },
];

export const colorMapArray: Record<string,string>= {
  "Jan 2026":"#d11717",
  "Feb 2025":"#2f81f7",
  "Mar 2025":"#12b886",
  "Apr 2025":"#af1c8a",
  "May 2025":"#83d425",
  "Jun 2025":"#f72f5a",
  "Jul 2025":"#b61c1c",
  "Aug 2025":"#2f81f7",
  "Sep 2025":"#f58d8d",
  "Oct 2025":"#863696",
  "Nov 2025":"#12b886",
  "Dec 2025":"#454580",
};

export const byCreator: BarRow[] = [
  { name: "Zain RealMadrid", value: 13800 },
  { name: "Huda Juventus", value: 11200 },
  { name: "Maryam PSG", value: 8200 },
  { name: "Maram Barcelona", value: 6600 },
  { name: "Max Liverpool", value: 15000 },
];

export const Limits: limit[] = [
  { name: "Top Three", value: 3 },
  { name: "Top Four", value: 4 },
  { name: "Top Five", value: 5 },
  { name: "Top Six", value: 6 },
  { name: "Top Seven", value: 7 },
];


export const colorMapByCreater: Record<string, string> = {
    "Zain RealMadrid": "#2f81f7",   // blue
    "Huda Juventus": "#12b886", // green
    "Maryam PSG": "#f59f00", // orange
    "Maram Barcelona": "#ff6b6b", 
    "Max Liverpool": "#4c12a8", 
    "Kylian Mbappe":"#bec6d6",
    "Vinicius Junior":"#810c29",
    "Jude Bellingham":"#32802f",
    "Rodrygo Forward":"#eb5216",
  };

  

export const byAssignee: BarRow[] = [
  { name: "Kylian Mbappe", value: 17000 },
  { name: "Vinicius Junior", value: 9000 },
  { name: "Jude Bellingham", value: 2000 },
  { name: "Rodrygo Forward", value: 14000 },
];

