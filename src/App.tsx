import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import Dashboard from "../src/pages/Dashboard";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataCalculation from "./data-calculation/dataCalculation";

// datasets
import incomeStatementRowDataInterface from "./common/interfaces/data/charts/incomeStatementRowDataInterface";
import singleValueRowDataInterface from "./common/interfaces/data/objects/forms/singleValueRowDataInterface";
import _ from "lodash";
import commonFunctions from "./common/functions/commonFunctions";
import OperatingExpenseDataInterface from "./common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";
import companyDataInterface from "./common/interfaces/data/companyDataInterface";
import singleValueBooleanRowDataInterface from "./common/interfaces/data/objects/forms/singleValueBooleanRowDataInterface";

const App: React.FC = () => {
  const [reloadDashboard, setReloadDashboard] = useState<boolean>(false);
  const [currentDatasource, setCurrentDatasource] =
    useState<companyDataInterface | null>(null);
  const [previousDatasource, setPreviousDatasource] =
    useState<companyDataInterface | null>(null);

  const [dateDataSource, setDateDataSource] = useState("current");
  const [filteredEntity, setFilteredEntity] = useState<string>("CLI");

  // handle for current and previous income statement uploads
  const handleReloadDashboard = (data: string | null) => {
    setReloadDashboard(!reloadDashboard);
    data !== null ? setFilteredEntity(data) : setFilteredEntity("CLI");
  };

  // endpoint varies depending on what the usage of the application is for
  const endpointURL: string[] = [
    "http://127.0.0.1:5000/upload",
    "https://seashell-app-3sxk9.ondigitalocean.app/upload",
  ];

  const handleIncomeStatementChange = async (file: File | null) => {
    if (file) {
      console.log("Successfully set file for current income statement.");
      const years: number[] = [2020, 2021];
      years.map(async (year) => {
        const formData = new FormData();
        const yearValue: string = year.toString();

        formData.append("file", file);
        formData.append("year", yearValue); // Add the year to the form data
        try {
          console.log("Awaiting server response...");
          const response = await axios.post(endpointURL[0], formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          Number.parseInt(yearValue) === 2020
            ? setPreviousDatasource(response.data)
            : setCurrentDatasource(response.data);
          localStorage.setItem(yearValue, response.data);
          console.log("File uploaded successfully", response.data);
        } catch (error) {
          console.error("Error uploading file", error);
        }
      });
    }
  };

  const cardTitles = [
    { title: null },
    { title: "REVENUE per BUs (PHP in millions)" },
    { title: "OPERATION EXPENSES (PHP in millions)" },
    { title: null },
    { title: "GPM PER ENTITY (%)" },
  ];

  const data = new dataCalculation(currentDatasource, previousDatasource); // load datasource/dataset from FY 2020 and 2021

  // create Income Statement Row Data Function
  const createIncomeStatementRowData = (
    id: number,
    name: string,
    currentYear: number,
    vsPreviousYear: boolean,
    percentage: number
  ): incomeStatementRowDataInterface => {
    return { id, name, currentYear, vsPreviousYear, percentage };
  };

  // --------- Revenue-related --------- //
  const currentRevenueData: singleValueRowDataInterface[] | null =
    data.getCurrentRevenueValue();

  const revenueVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getRevenueVsPy();

  const revenueVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getRevenueVsPyPercentage();

  // extract results from objects
  const currentRevenueResult: singleValueRowDataInterface | null =
    (currentRevenueData
      ? _.find(currentRevenueData, { name: filteredEntity })
      : null) || null;

  const revenueVsPyResult: singleValueBooleanRowDataInterface | null =
    (revenueVsPy ? _.find(revenueVsPy, { name: filteredEntity }) : null) ||
    null;
  const revenueVsPyPercentageResult: singleValueRowDataInterface | null =
    (revenueVsPyPercentage
      ? _.find(revenueVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End Revenue-related --------//

  // --------- COGS-related --------- //
  const currentCogsData: singleValueRowDataInterface[] | null =
    data.getCurrentCogsValue();

  const cogsVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getCogsVsPy();

  const cogsVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getCogsVsPyPercentage();

  // extract results from objects
  const currentCogsResult: singleValueRowDataInterface | null =
    (currentCogsData
      ? _.find(currentCogsData, { name: filteredEntity })
      : null) || null;

  const cogsVsPyResult: singleValueBooleanRowDataInterface | null =
    (cogsVsPy ? _.find(cogsVsPy, { name: filteredEntity }) : null) || null;
  const cogsVsPyPercentageResult: singleValueRowDataInterface | null =
    (cogsVsPyPercentage
      ? _.find(cogsVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End COGS-related --------//

  // --------- Gross Profit-related --------- //
  const currentGrossProfitData: singleValueRowDataInterface[] | null =
    data.getCurrentGrossProfitValue();

  const grossProfitVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getGrossProfitVsPy();

  const grossProfitVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getGrossProfitVsPyPercentage();

  // extract results from objects
  const currentGrossProfitResult: singleValueRowDataInterface | null =
    (currentGrossProfitData
      ? _.find(currentGrossProfitData, { name: filteredEntity })
      : null) || null;

  const grossProfitVsPyResult: singleValueBooleanRowDataInterface | null =
    (grossProfitVsPy
      ? _.find(grossProfitVsPy, { name: filteredEntity })
      : null) || null;
  const grossProfitVsPyPercentageResult: singleValueRowDataInterface | null =
    (grossProfitVsPyPercentage
      ? _.find(grossProfitVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End Gross Profit-related --------//

  // --------- OPEX-related --------- //
  const currentOpexData: singleValueRowDataInterface[] | null =
    data.getCurrentOpexValue();

  const opexVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getOpexVsPy();

  const opexVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getOpexVsPyPercentage();

  // extract results from objects
  const currentOpexResult: singleValueRowDataInterface | null =
    (currentOpexData
      ? _.find(currentOpexData, { name: filteredEntity })
      : null) || null;

  const opexVsPyResult: singleValueBooleanRowDataInterface | null =
    (opexVsPy ? _.find(opexVsPy, { name: filteredEntity }) : null) || null;
  const opexVsPyPercentageResult: singleValueRowDataInterface | null =
    (opexVsPyPercentage
      ? _.find(opexVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End Gross Profit-related --------//

  const rows: incomeStatementRowDataInterface[] = [
    // Revenue
    createIncomeStatementRowData(
      0,
      "Revenue",
      currentRevenueResult?.value != null ? currentRevenueResult?.value : 0,
      revenueVsPyResult?.value != null ? revenueVsPyResult?.value : false, // false by default
      revenueVsPyPercentageResult?.value != null
        ? revenueVsPyPercentageResult?.value
        : 0
    ),

    // COGS
    createIncomeStatementRowData(
      1,
      "COGS",
      currentCogsResult?.value != null ? currentCogsResult?.value : 0,
      cogsVsPyResult?.value != null ? cogsVsPyResult?.value : false, // false by default
      cogsVsPyPercentageResult?.value != null
        ? cogsVsPyPercentageResult?.value
        : 0
    ),

    // Gross Profit
    createIncomeStatementRowData(
      2,
      "Gross Profit",
      currentGrossProfitResult?.value != null
        ? currentGrossProfitResult?.value
        : 0,
      grossProfitVsPyResult?.value != null
        ? grossProfitVsPyResult?.value
        : false, // false by default
      grossProfitVsPyPercentageResult?.value != null
        ? grossProfitVsPyPercentageResult?.value
        : 0
    ),

    // OPEX
    createIncomeStatementRowData(
      3,
      "OPEX",
      currentOpexResult?.value != null ? currentOpexResult?.value : 0,
      opexVsPyResult?.value != null ? opexVsPyResult?.value : false, // false by default
      opexVsPyPercentageResult?.value != null
        ? opexVsPyPercentageResult?.value
        : 0
    ),

    // Commissions
    createIncomeStatementRowData(4, "Commissions", 0, true, 0),

    // Management Fee Expenses
    createIncomeStatementRowData(5, "Management Fee Expenses", 0, true, 0),

    // Professional & Legal Fees
    createIncomeStatementRowData(6, "Professional and Legal Fees", 0, true, 0),

    // Security & Janitorial
    createIncomeStatementRowData(7, "Security and Janitorial", 0, true, 0),

    // Taxes and Licenses
    createIncomeStatementRowData(8, "Taxes and Licenses", 0, true, 0),

    // Other Income
    createIncomeStatementRowData(9, "Other Income", 0, true, 0),

    // Other Expenses
    createIncomeStatementRowData(10, "Other Expenses", 0, true, 0),

    // EBITDA
    createIncomeStatementRowData(11, "EBIT", 0, true, 0),

    // Interest and Tax
    createIncomeStatementRowData(12, "Interest and Taxes", 0, true, 0),

    // Net Profit
    createIncomeStatementRowData(13, "Net Profit", 0, true, 0),
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
        pieData: [data.getOpexPerBU(dateDataSource) || []],
        incomeStatementTableData: [rows || []],
      },
    ],
  };

  return (
    <div className="app-container">
      <SidebarComponent
        onCheckboxClick={handleReloadDashboard}
        onFileUpload={handleIncomeStatementChange}
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
