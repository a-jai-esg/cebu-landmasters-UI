import React, { useState } from "react";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import Dashboard from "../src/pages/Dashboard";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataCalculation from "./data-calculation/dataCalculation";

// datasets
import dataSource2021 from "./data/incomeStatementDataSource2021.json";
import dataSource2020 from "./data/incomeStatementDataSource2020.json";
import incomeStatementRowDataInterface from "./common/interfaces/data/charts/incomeStatementRowDataInterface";
import singleValueRowDataInterface from "./common/interfaces/data/objects/forms/singleValueRowDataInterface";
import _ from "lodash";
import commonFunctions from "./common/functions/commonFunctions";
import OperatingExpenseDataInterface from "./common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";

const App: React.FC = () => {
  const [reloadDashboard, setReloadDashboard] = useState<boolean>(false);
  const [dateDataSource, setDateDataSource] = useState("current");
  const [filteredEntity, setFilteredEntity] = useState<string>("CLI");

  // handle for current and previous income statement uploads
  const [currentIncomeStatement, setCurrentIncomeStatement] =
    useState<File | null>(null);
  const [previousIncomeStatement, setPreviousIncomeStatement] =
    useState<File | null>(null);

  const handleReloadDashboard = (data: string | null) => {
    setReloadDashboard(!reloadDashboard);
    data !== null ? setFilteredEntity(data) : setFilteredEntity("CLI");
  };

  const handleCurrentIncomeStatementChange = (file: File | null) => {
    setCurrentIncomeStatement(file);
    console.log(currentIncomeStatement);
    console.log("Successfully set file for current income statement.");
  };

  const handlePreviousIncomeStatementChange = (file: File | null) => {
    setPreviousIncomeStatement(file);
    console.log(previousIncomeStatement);
    console.log("Successfully set file for previous income statement.");
  };

  const cardTitles = [
    { title: null },
    { title: "REVENUE per BUs (PHP in millions)" },
    { title: "OPERATION EXPENSES (PHP in millions)" },
    { title: null },
    { title: "GPM PER ENTITY (%)" },
  ];

  const commonFunc = new commonFunctions();
  const data = new dataCalculation(dataSource2020, dataSource2021); // load datasource/dataset from FY 2020 and 2021

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

  // get income statement row data

  // --------- Revenue-related --------- //
  const revenuePercentageData: singleValueRowDataInterface[] | null =
    data.getRevenuePercentage();
  const currentRevenueData: singleValueRowDataInterface[] | null =
    data.getCurrentRevenueValue();
  const previousRevenueData: singleValueRowDataInterface[] | null =
    data.getPreviousRevenueValue();

  // extract results from objects
  const revenuePercentageResult: singleValueRowDataInterface | null =
    (revenuePercentageData
      ? _.find(revenuePercentageData, { name: filteredEntity })
      : null) || null;
  const currentRevenueResult: singleValueRowDataInterface | null =
    (revenuePercentageData
      ? _.find(currentRevenueData, { name: filteredEntity })
      : null) || null;
  const previousRevenueResult: singleValueRowDataInterface | null =
    (revenuePercentageData
      ? _.find(previousRevenueData, { name: filteredEntity })
      : null) || null;
  // --------- End Revenue-related --------//

  // --------- COS-related --------- //
  const cosPercentageData: singleValueRowDataInterface[] | null =
    data.getCosPercentage();
  const currentCosData: singleValueRowDataInterface[] | null =
    data.getCurrentCosValue();
  const previousCosData: singleValueRowDataInterface[] | null =
    data.getPreviousCosValue();

  // extract results from objects
  const cosPercentageResult: singleValueRowDataInterface | null =
    (cosPercentageData
      ? _.find(cosPercentageData, { name: filteredEntity })
      : null) || null;
  const currentCosResult: singleValueRowDataInterface | null =
    (cosPercentageData
      ? _.find(currentCosData, { name: filteredEntity })
      : null) || null;
  const previousCosResult: singleValueRowDataInterface | null =
    (cosPercentageData
      ? _.find(previousCosData, { name: filteredEntity })
      : null) || null;
  // --------- End COS-related --------- //

  // --------- Gross-profit-related --------- //
  const grossProfitPercentageData: singleValueRowDataInterface[] | null =
    data.getGrossProfitPercentage();
  const currentGrossProfitData: singleValueRowDataInterface[] | null =
    data.getCurrentGrossProfitValue();
  const previousGrossProfitData: singleValueRowDataInterface[] | null =
    data.getPreviousGrossProfitValue();

  // extract results from objects
  const grossProfitPercentageResult: singleValueRowDataInterface | null =
    (grossProfitPercentageData
      ? _.find(grossProfitPercentageData, { name: filteredEntity })
      : null) || null;
  const currentGrossProfitResult: singleValueRowDataInterface | null =
    (grossProfitPercentageData
      ? _.find(currentGrossProfitData, { name: filteredEntity })
      : null) || null;
  const previousGrossProfitResult: singleValueRowDataInterface | null =
    (grossProfitPercentageData
      ? _.find(previousGrossProfitData, { name: filteredEntity })
      : null) || null;
  // --------- End Revenue-related --------//

  // --------- Other Income or expense-related --------- //
  const otherIncomeOrExpensePercentageData:
    | singleValueRowDataInterface[]
    | null = data.getOtherTotalOpexPercentage();
  const currentOtherIncomeOrExpenseData: singleValueRowDataInterface[] | null =
    data.getCurrentOtherTotalOperatingExpenses();
  const previousOtherIncomeOrExpenseData: singleValueRowDataInterface[] | null =
    data.getPreviousOtherTotalOperatingExpenses();

  // extract results from objects
  const otherIncomeOrExpensePercentageResult: singleValueRowDataInterface | null =
    (otherIncomeOrExpensePercentageData
      ? _.find(otherIncomeOrExpensePercentageData, { name: filteredEntity })
      : null) || null;
  const currentOtherIncomeOrExpenseResult: singleValueRowDataInterface | null =
    (currentOtherIncomeOrExpenseData
      ? _.find(currentOtherIncomeOrExpenseData, { name: filteredEntity })
      : null) || null;
  const previousOtherIncomeOrExpenseResult: singleValueRowDataInterface | null =
    (previousOtherIncomeOrExpenseData
      ? _.find(previousOtherIncomeOrExpenseData, { name: filteredEntity })
      : null) || null;
  // --------- End Other Income or expense-related --------//

  // --------- Opex-related --------- //
  const opexPercentageData: singleValueRowDataInterface[] | null =
    data.getOpexPercentage();
  const opexCurrentTotalOpexValue: singleValueRowDataInterface[] | null =
    data.getCurrentTotalOpexValue();
  const opexPreviousTotalOpexValue: singleValueRowDataInterface[] | null =
    data.getPreviousTotalOpexValue();

  // per BU
  const currentOpexDataPerBu: OperatingExpenseDataInterface[] | null =
    data.getOpexPerBU("current");
  const previousOpexDataPerBu: OperatingExpenseDataInterface[] | null =
    data.getOpexPerBU("previous");

  // specific opex result/s
  const currentSpecificOpexResult: OperatingExpenseDataInterface | null =
    (currentOpexDataPerBu
      ? _.find(currentOpexDataPerBu, { name: filteredEntity })
      : null) || null;

  const currentCommissionsResult: number | null =
    currentSpecificOpexResult != null &&
    currentSpecificOpexResult.expenses != null
      ? currentSpecificOpexResult.expenses.commissions
      : null;

  const currentManagementFeeExpenseResult: number | null =
    currentSpecificOpexResult != null &&
    currentSpecificOpexResult.expenses != null
      ? currentSpecificOpexResult.expenses.management_fee_expense
      : null;

  const currentProfessionalAndLegalFeesResult: number | null =
    currentSpecificOpexResult != null &&
    currentSpecificOpexResult.expenses != null
      ? currentSpecificOpexResult.expenses.professional_and_legal_fees
      : null;

  const currentSecurityAndJanitorialServicesResult: number | null =
    currentSpecificOpexResult != null &&
    currentSpecificOpexResult.expenses != null
      ? currentSpecificOpexResult.expenses.security_and_janitorial_services
      : null;

  const currentTaxesAndLicensesResult: number | null =
    currentSpecificOpexResult != null &&
    currentSpecificOpexResult.expenses != null
      ? currentSpecificOpexResult.expenses.taxes_and_licenses
      : null;

  const previousSpecificOpexResult: OperatingExpenseDataInterface | null =
    (previousOpexDataPerBu
      ? _.find(previousOpexDataPerBu, { name: filteredEntity })
      : null) || null;

  const previousCommissionsResult: number | null =
    previousSpecificOpexResult != null &&
    previousSpecificOpexResult.expenses != null
      ? previousSpecificOpexResult.expenses.commissions
      : null;

  const previousManagementFeeExpenseResult: number | null =
    previousSpecificOpexResult != null &&
    previousSpecificOpexResult.expenses != null
      ? previousSpecificOpexResult.expenses.management_fee_expense
      : null;

  const previousProfessionalAndLegalFeesResult: number | null =
    previousSpecificOpexResult != null &&
    previousSpecificOpexResult.expenses != null
      ? previousSpecificOpexResult.expenses.professional_and_legal_fees
      : null;

  const previousSecurityAndJanitorialServicesResult: number | null =
    previousSpecificOpexResult != null &&
    previousSpecificOpexResult.expenses != null
      ? previousSpecificOpexResult.expenses.security_and_janitorial_services
      : null;

  const previousTaxesAndLicensesResult: number | null =
    previousSpecificOpexResult != null &&
    previousSpecificOpexResult.expenses != null
      ? previousSpecificOpexResult.expenses.taxes_and_licenses
      : null;

  // extract results from objects
  const opexPercentageResult: singleValueRowDataInterface | null =
    (opexPercentageData
      ? _.find(opexPercentageData, { name: filteredEntity })
      : null) || null;
  const opexCurrentTotalOpexResult: singleValueRowDataInterface | null =
    (opexCurrentTotalOpexValue
      ? _.find(opexCurrentTotalOpexValue, { name: filteredEntity })
      : null) || null;
  const opexPreviousTotalOpexResult: singleValueRowDataInterface | null =
    (opexPreviousTotalOpexValue
      ? _.find(opexPreviousTotalOpexValue, { name: filteredEntity })
      : null) || null;

  // --------- End Opex-related --------//

  const rows: incomeStatementRowDataInterface[] = [
    // Revenue
    createIncomeStatementRowData(
      0,
      "Revenue",
      currentRevenueResult?.value != null ? currentRevenueResult.value : 0,
      commonFunc.checkComparison(
        currentRevenueResult?.value != null ? currentRevenueResult.value : 0,
        previousRevenueResult?.value != null ? previousRevenueResult.value : 0
      ),
      revenuePercentageResult?.value != null ? revenuePercentageResult.value : 0
    ),

    // COGS / COS
    createIncomeStatementRowData(
      1,
      "COGS",
      currentCosResult?.value != null ? currentCosResult.value : 0,
      commonFunc.checkComparison(
        currentCosResult?.value != null ? currentCosResult.value : 0,
        previousCosResult?.value != null ? previousCosResult.value : 0
      ),
      cosPercentageResult?.value != null ? cosPercentageResult.value : 0
    ),

    // Gross Profit
    createIncomeStatementRowData(
      2,
      "Gross Profit",
      currentGrossProfitResult?.value != null
        ? currentGrossProfitResult.value
        : 0,
      commonFunc.checkComparison(
        currentGrossProfitResult?.value != null
          ? currentGrossProfitResult.value
          : 0,
        previousGrossProfitResult?.value != null
          ? previousGrossProfitResult.value
          : 0
      ),
      grossProfitPercentageResult?.value != null
        ? grossProfitPercentageResult.value
        : 0
    ),

    // OPEX
    createIncomeStatementRowData(
      3,
      "OPEX",
      opexCurrentTotalOpexResult?.value != null
        ? opexCurrentTotalOpexResult?.value
        : 0,
      commonFunc.checkComparison(
        opexCurrentTotalOpexResult?.value != null
          ? opexCurrentTotalOpexResult.value
          : 0,
        opexPreviousTotalOpexResult?.value != null
          ? opexPreviousTotalOpexResult?.value
          : 0
      ),
      opexPercentageResult?.value != null ? opexPercentageResult.value : 0
    ),

    // Other operating expenses
    createIncomeStatementRowData(
      9,
      "Other Operating Expenses",
      currentOtherIncomeOrExpenseResult?.value != null
        ? currentOtherIncomeOrExpenseResult?.value
        : 0,
      commonFunc.checkComparison(
        currentOtherIncomeOrExpenseResult?.value != null
          ? currentOtherIncomeOrExpenseResult?.value
          : 0,
        previousOtherIncomeOrExpenseResult?.value != null
          ? previousOtherIncomeOrExpenseResult?.value
          : 0
      ),
      otherIncomeOrExpensePercentageResult?.value != null
        ? otherIncomeOrExpensePercentageResult?.value
        : 0
    ),
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
        onCurrentFileUpload={handleCurrentIncomeStatementChange}
        onPreviousFileUpload={handlePreviousIncomeStatementChange}
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
