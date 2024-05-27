import React, { useState } from "react";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import Dashboard from "../src/pages/Dashboard";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataCalculation from "./data-calculation/dataCalculation";

// datasets
import dataSource2021 from "./data/incomeStatementDataSource2021.json";
import dataSource2020 from "./data/incomeStatementDataSource2020.json";

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
  const dataCalc2020 = new dataCalculation(dataSource2020); // data calculation
  const dataCalc2021 = new dataCalculation(dataSource2021); // data calculation

  // chart data of 2020
  const chartData2020: chartDataInterface = {
    chartData: [
      {
        gaugeData: [
          dataCalc2020.getGPM(),
          dataCalc2020.getOpexRatio(),
          dataCalc2020.getNpMargin(),
          dataCalc2020.getConsolidatedNIAT(),
          dataCalc2020.getParentNIAT(),
        ],
        barData: [
          { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
          { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
          { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
          { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
          { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        ],
        composedChartData: [dataCalc2020.getGPM()],
        pieData: [dataCalc2020.getOpexPerEntity()],
      },
    ],
  };

  // chart data of 2021
  const chartData2021: chartDataInterface = {
    chartData: [
      {
        gaugeData: [
          dataCalc2021.getGPM(),
          dataCalc2021.getOpexRatio(),
          dataCalc2021.getNpMargin(),
          dataCalc2021.getConsolidatedNIAT(),
          dataCalc2021.getParentNIAT(),
        ],
        barData: [
          { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
          { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
          { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
          { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
          { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
        ],
        composedChartData: [dataCalc2021.getGPM()],
        pieData: [dataCalc2021.getOpexPerEntity()],
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
          chartData={chartData2021} // default is data for 2021
          reload={reloadDashboard}
          entityFilter={filteredEntity}
        />
      </div>
    </div>
  );
};

export default App;
