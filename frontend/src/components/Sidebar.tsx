export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Dashboards</div>

      <div className="navGroupTitle">Operational</div>
      <div className="navItem">
        <span>📌</span> <span className="navText">KPIs</span>
      </div>

      <div className="navItem active">
        <span className="navText">Cost Impacts</span>
      </div>

      <div className="navItem">
        <span className="navText">Asset Health</span>
      </div>

      <div className="navItem">
        <span className="navText">Efficiency</span>
      </div>

      <div className="navItem">
        <span className="navText">resource Usage</span>
      </div>
    </aside>
  );
}