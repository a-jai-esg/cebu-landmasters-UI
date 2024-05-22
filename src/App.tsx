import React, { useState } from "react";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import Dashboard from "../src/pages/Dashboard";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataSource2021 from "./data/incomeStatementDataSource2021.json";
import dataCalculation from "./data-calculation/dataCalculation";

const App: React.FC = () => {
  const [reloadDashboard, setReloadDashboard] = useState(false);
  const [filteredEntity, setFilteredEntity] = useState("CLI");

  // Function to trigger dashboard reload
  const handleReloadDashboard = (data: string | null) => {
    setReloadDashboard(!reloadDashboard);
    data != null ? setFilteredEntity(data) : setFilteredEntity("CLI");
  };

  const cardTitles = [
    { title: "Card 1" },
    { title: "REVENUE per BUs" },
    { title: "OPERATION EXPENSES" },
    { title: null },
    { title: "GPM PER ENTITY" },
  ];

  // data calculation goes here:
  const dataCalc = new dataCalculation(dataSource2021); // gauge data

  const chartData: chartDataInterface = {
    chartData: [
      {
        gaugeData: [
          dataCalc.getGPM(),
          dataCalc.getOpexRatio(),
          dataCalc.getNpMargin(),
          dataCalc.getConsolidatedNIAT(),
          dataCalc.getParentNIAT(),
        ],
        barData: [
          { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
          { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
          { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
          { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
          { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        ],
        composedChartData: [dataCalc.getGPM()],
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
          entityFilter={filteredEntity}
        />
      </div>
    </div>
  );
};

export default App;
