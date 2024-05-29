import React, { useState } from "react";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import Dashboard from "../src/pages/Dashboard";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataCalculation from "./data-calculation/dataCalculation";
import { Dayjs } from "dayjs";

// datasets
import dataSource2021 from "./data/incomeStatementDataSource2021.json";
import dataSource2020 from "./data/incomeStatementDataSource2020.json";

const App: React.FC = () => {
  const [reloadDashboard, setReloadDashboard] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [dateDataSource, setDateDataSource] = useState<string>("current");
  const [filteredEntity, setFilteredEntity] = useState<string>("CLI");

  const handleReloadDashboard = (data: string | null) => {
    setReloadDashboard(!reloadDashboard);
    data !== null ? setFilteredEntity(data) : setFilteredEntity("CLI");
  };

  const handleStartDateChange = (date: Dayjs | null) => {
    setStartDate(date);
    console.log("Start Date: ", date);
  };

  const handleEndDateChange = (date: Dayjs | null) => {
    setEndDate(date);
    console.log("End Date: ", date);
  };

  const cardTitles = [
    { title: "Card 1" },
    { title: "REVENUE per BUs" },
    { title: "OPERATION EXPENSES" },
    { title: null },
    { title: "GPM PER ENTITY" },
  ];

  const data = new dataCalculation(dataSource2020, dataSource2021); // load datasource/dataset from FY 2020 and 2021

  const chartData: chartDataInterface = {
    chartData: [
      {
        gaugeData: [
          data.getGPM(dateDataSource) || [],
          data.getOpexRatio(dateDataSource) || [],
          data.getNpMargin(dateDataSource) || [],
          data.getConsolidatedNIAT(dateDataSource) || [],
          data.getParentNIAT(dateDataSource) || [],
        ],
        barData: [data.getRevenuePerBU(dateDataSource) || []],
        composedChartData: [data.getGPM(dateDataSource) || []],
        pieData: [data.getOpexPerEntity(dateDataSource) || []],
      },
    ],
  };

  return (
    <div className="app-container">
      <SidebarComponent
        onCheckboxClick={handleReloadDashboard}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
      />
      <div className="dashboard-container">
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
