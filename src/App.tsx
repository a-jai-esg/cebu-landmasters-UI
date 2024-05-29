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
import incomeStatementRowDataInterface from "./common/interfaces/data/charts/incomeStatementRowDataInterface";
import singleValueRowDataInterface from "./common/interfaces/data/objects/forms/singleValueRowDataInterface";
import _ from "lodash";

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

  // create Income Statement Row Data Function
  const createIncomeStatementRowData = (
    id: number,
    name: string,
    currentYear: number,
    percentage: number
  ): incomeStatementRowDataInterface => {
    return { id, name, currentYear, percentage };
  };

  // get income statement row data
  const revenuePercentageData: singleValueRowDataInterface[] | null =
    data.getRevenuePercentage(dateDataSource);

  const cosPercentageData: singleValueRowDataInterface[] | null =
    data.getCosPercentage(dateDataSource);
  // const currentRevenueData: singleValueRowDataInterface[] | null =
  //   data.getCurrentRevenueValue();

  // const previousRevenueData: singleValueRowDataInterface[] | null =
  //   data.getPreviousRevenueValue();

  // extract results from objects
  const revenuePercentageResult: singleValueRowDataInterface | null =
    (revenuePercentageData
      ? _.find(revenuePercentageData, { name: filteredEntity })
      : null) || null;

  const cosPercentageResult: singleValueRowDataInterface | null =
    (cosPercentageData
      ? _.find(cosPercentageData, { name: filteredEntity })
      : null) || null;

  // get comparisons

  const rows: incomeStatementRowDataInterface[] = [
    createIncomeStatementRowData(
      0,
      "Revenue",
      0,
      revenuePercentageResult?.value != null ? revenuePercentageResult.value : 0
    ),
    createIncomeStatementRowData(
      1,
      "COGS",
      0,
      cosPercentageResult?.value != null ? cosPercentageResult.value : 0
    ),
    // createIncomeStatementRowData(2, "Gross Profit", 0, null),
    // createIncomeStatementRowData(3, "OPEX", 0, null),
    // createIncomeStatementRowData(4, "Sales", 0, null),
    // createIncomeStatementRowData(5, "Marketing", 0, null),
    // createIncomeStatementRowData(6, "IT", 0, null),
    // createIncomeStatementRowData(7, "General and Admin", 0, null),
    // createIncomeStatementRowData(8, "Other Income", 0, null),
    // createIncomeStatementRowData(9, "Other Expenses", 0, null),
    // createIncomeStatementRowData(10, "EBIT", 0, null),
    // createIncomeStatementRowData(11, "Interest and Tax", 0, null),
    // createIncomeStatementRowData(12, "Net Profit", 0, null),
  ];

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
        incomeStatementTableData: [rows || []],
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
