import React, { useState } from "react";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import Dashboard from "../src/pages/Dashboard";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataSource from "../dataSource.json";
import dataReadAndCalculation from "./data/dataCalculation";

const App: React.FC = () => {
  const [reloadDashboard, setReloadDashboard] = useState(false);

  // Function to trigger dashboard reload
  const handleReloadDashboard = () => {
    setReloadDashboard(!reloadDashboard);
  };

  const cardTitles = [
    { title: "Card 1" },
    { title: "REVENUE per BUs" },
    { title: "OPERATION EXPENSES VS BUDGET" },
    { title: null },
    { title: "GPM PER ENTITY" },
  ];

  const calculation = new dataReadAndCalculation(dataSource);
  const chartData: chartDataInterface = {
    chartData: [
      {
        gaugeData: [
          calculation.getGPM(),
          calculation.getOpexRatio(),
          calculation.getNpMargin(),
          calculation.getConsolidatedNIAT(),
          calculation.getParentNIAT(),
        ],
        barData: [
          { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
          { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
          { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
          { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
          { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        ],
        lineData: [
          { name: "Page 1", uv: 400, pv: 2400, amt: 2400 },
          { name: "Page 2", uv: 300, pv: 1398, amt: 2210 },
          { name: "Page 3", uv: 200, pv: 9800, amt: 2290 },
          { name: "Page 4", uv: 278, pv: 3908, amt: 2000 },
          { name: "Page 5", uv: 189, pv: 4800, amt: 2181 },
        ],
        pieData: [
          { name: "Category A", value: 200 },
          { name: "Category B", value: 300 },
          { name: "Category C", value: 500 },
          { name: "Category D", value: 100 },
        ],
      },
    ],
  };

  return (
    <div className="app-container">
      <SidebarComponent onCheckboxClick={handleReloadDashboard} />
      <div className="dashboard-container">
        {/* Pass reload prop */}
        <Dashboard
          cardTitles={cardTitles}
          chartData={chartData}
          reload={reloadDashboard}
        />
      </div>
    </div>
  );
};

export default App;
