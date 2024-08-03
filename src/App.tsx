import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import SidebarComponent from "./components/global/Sidebar";
import IncomeStatementComponent from "./pages/Income Statement";
import BalanceSheetComponent from "./pages/Balance Sheet";
import CashFlowComponent from "./pages/Cash Flow";
import chartDataInterface from "./common/interfaces/data/charts/chartDataInterface";
import dataCalculation from "./data-calculation/dataCalculation";

// datasets
import incomeStatementRowDataInterface from "./common/interfaces/data/charts/incomeStatementRowDataInterface";
import singleValueRowDataInterface from "./common/interfaces/data/objects/forms/singleValueRowDataInterface";
import _ from "lodash";
import companyDataInterface from "./common/interfaces/data/companyDataInterface";
import singleValueBooleanRowDataInterface from "./common/interfaces/data/objects/forms/singleValueBooleanRowDataInterface";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  const [reloadDashboard, setReloadDashboard] = useState<boolean>(false);
  const [currentDatasource, setCurrentDatasource] =
    useState<companyDataInterface | null>(null);
  const [previousDatasource, setPreviousDatasource] =
    useState<companyDataInterface | null>(null);

  const [dateDataSource] = useState("current");
  const [filteredEntity, setFilteredEntity] = useState<string>("CLI");
  const [loading, setLoading] = useState(false);

  // current page
  const [page, setPage] = useState("Dashboard");

  // handle for current and previous income statement uploads
  const handleReloadDashboard = (data: string | null) => {
    setReloadDashboard(!reloadDashboard);
    data !== null ? setFilteredEntity(data) : setFilteredEntity("CLI");
  };

  // endpoint varies depending on what the usage of the application is for
  const endpointURL: string[] = [
    "http://127.0.0.1:5000/upload", // development mode
    "https://seashell-app-3sxk9.ondigitalocean.app/upload", // deployment mode
  ];

  const handleClearDataSources = (remove: boolean | null) => {
    if (remove) {
      setCurrentDatasource(null);
      setPreviousDatasource(null);
    }
  };

  const handleIncomeStatementChange = async (file: File | null) => {
    if (file) {
      setLoading(true);
      console.log("Successfully set file for current income statement.");
      const years: number[] = [2020, 2021];
      years.map(async (year) => {
        const formData = new FormData();
        const yearValue: string = year.toString();

        formData.append("file", file);
        formData.append("year", yearValue); // Add the year to the form data
        try {
          console.log("Awaiting server response...");
          const response = await axios.post(endpointURL[1], formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          Number.parseInt(yearValue) === 2020
            ? setPreviousDatasource(response.data)
            : setCurrentDatasource(response.data);
          console.log("File uploaded successfully", response.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error("Error uploading file", error);
        }
      });
    }
  };

  // dashboard component titles
  const incomeStatementCardTitles = [
    { title: null },
    { title: "REVENUE per BUs (PHP in millions)" },
    { title: "OPERATION EXPENSES (PHP in millions)" },
    { title: null },
    { title: "GPM PER ENTITY (%)" },
  ];

  const cashFlowCardTitles = [
    { title: null },
    { title: "REVENUE per BUs (PHP in millions)" },
    { title: "OPERATION EXPENSES (PHP in millions)" },
    { title: null },
    { title: "GPM PER ENTITY (%)" },
  ];

  const balanceSheetCardTitles = [
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
  const currentOpexCommissionsData: singleValueRowDataInterface[] | null =
    data.getOpexCurrentCommissionsValue();
  const currentOpexMgtFeeExpensesData: singleValueRowDataInterface[] | null =
    data.getCurrentOpexMgtFeeExpensesValue();
  const currentOpexProAndLegalFeesData: singleValueRowDataInterface[] | null =
    data.getCurrentProAndLegalFeesValue();
  const currentOpexSecAndJanitorialData: singleValueRowDataInterface[] | null =
    data.getCurrentSecAndJanitorialValue();
  const currentOpexTaxesAndLicensesData: singleValueRowDataInterface[] | null =
    data.getCurrentTaxesAndLicensesValue();

  const currentOpexVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getOpexVsPy();
  const currentOpexCommissionsVsPy:
    | singleValueBooleanRowDataInterface[]
    | null = data.getOpexCommissionsVsPy();
  const currentOpexMgtFeeExpensesVsPy:
    | singleValueBooleanRowDataInterface[]
    | null = data.getOpexMgtFeeExpensesVsPy();
  const currentOpexProAndLegalFeesVsPy:
    | singleValueBooleanRowDataInterface[]
    | null = data.getProAndLegalFeesVsPy();
  const currentOpexSecAndJanitorialVsPy:
    | singleValueBooleanRowDataInterface[]
    | null = data.getSecAndJanitorialVsPy();
  const currentOpexTaxesAndLicensesVsPy:
    | singleValueBooleanRowDataInterface[]
    | null = data.getTaxesAndLicensesVsPy();

  const currentOpexVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getOpexVsPyPercentage();
  const currentOpexCommissionsVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getCommissionsVsPyPercentage();
  const currentOpexMgtFeeExpensesVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getOpexMgtFeeExpenseVsPyPercentage();
  const currentOpexProAndLegalFeesVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getProAndLegalFeesVsPyPercentage();
  const currentOpexSecAndJanitorialVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getSecAndJanitorialVsPyPercentage();
  const currentOpexTaxesAndLicensesVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getTaxesAndLicensesVsPyPercentage();

  // extract results from objects

  // actual data/numbers
  const currentOpexResult: singleValueRowDataInterface | null =
    (currentOpexData
      ? _.find(currentOpexData, { name: filteredEntity })
      : null) || null;
  const currentOpexCommissionsResult: singleValueRowDataInterface | null =
    (currentOpexCommissionsData
      ? _.find(currentOpexCommissionsData, { name: filteredEntity })
      : null) || null;
  const currentOpexMgtFeeExpensesResult: singleValueRowDataInterface | null =
    (currentOpexMgtFeeExpensesData
      ? _.find(currentOpexMgtFeeExpensesData, { name: filteredEntity })
      : null) || null;
  const currentOpexProAndLegalFeesResult: singleValueRowDataInterface | null =
    (currentOpexProAndLegalFeesData
      ? _.find(currentOpexProAndLegalFeesData, { name: filteredEntity })
      : null) || null;
  const currentOpexSecAndJanitorialResult: singleValueRowDataInterface | null =
    (currentOpexSecAndJanitorialData
      ? _.find(currentOpexSecAndJanitorialData, { name: filteredEntity })
      : null) || null;
  const currentOpexTaxesAndLicensesResult: singleValueRowDataInterface | null =
    (currentOpexTaxesAndLicensesData
      ? _.find(currentOpexTaxesAndLicensesData, { name: filteredEntity })
      : null) || null;

  // up and down arrows
  const currentOpexVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOpexVsPy
      ? _.find(currentOpexVsPy, { name: filteredEntity })
      : null) || null;

  const currentOpexCommissionsVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOpexCommissionsVsPy
      ? _.find(currentOpexCommissionsVsPy, { name: filteredEntity })
      : null) || null;

  const currentOpexMgtFeeExpensesVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOpexMgtFeeExpensesVsPy
      ? _.find(currentOpexMgtFeeExpensesVsPy, { name: filteredEntity })
      : null) || null;

  const currentOpexProAndLegalFeesVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOpexProAndLegalFeesVsPy
      ? _.find(currentOpexProAndLegalFeesVsPy, { name: filteredEntity })
      : null) || null;

  const currentOpexSecAndJanitorialVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOpexSecAndJanitorialVsPy
      ? _.find(currentOpexSecAndJanitorialVsPy, { name: filteredEntity })
      : null) || null;

  const currentOpexTaxesAndLicensesVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOpexTaxesAndLicensesVsPy
      ? _.find(currentOpexTaxesAndLicensesVsPy, { name: filteredEntity })
      : null) || null;

  // percentages
  const currentOpexVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOpexVsPyPercentage
      ? _.find(currentOpexVsPyPercentage, { name: filteredEntity })
      : null) || null;

  const currentOpexCommissionsVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOpexCommissionsVsPyPercentage
      ? _.find(currentOpexCommissionsVsPyPercentage, { name: filteredEntity })
      : null) || null;

  const currentOpexMgtFeeExpensesVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOpexMgtFeeExpensesVsPyPercentage
      ? _.find(currentOpexMgtFeeExpensesVsPyPercentage, {
          name: filteredEntity,
        })
      : null) || null;

  const currentOpexProAndLegalFeesVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOpexProAndLegalFeesVsPyPercentage
      ? _.find(currentOpexProAndLegalFeesVsPyPercentage, {
          name: filteredEntity,
        })
      : null) || null;

  const currentOpexSecAndJanitorialVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOpexSecAndJanitorialVsPyPercentage
      ? _.find(currentOpexSecAndJanitorialVsPyPercentage, {
          name: filteredEntity,
        })
      : null) || null;

  const currentOpexTaxesAndLicensesVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOpexTaxesAndLicensesVsPyPercentage
      ? _.find(currentOpexTaxesAndLicensesVsPyPercentage, {
          name: filteredEntity,
        })
      : null) || null;

  // --------- End OPEX-related --------- //

  // --------- Other Income-related --------- //
  const currentOtherIncomeData: singleValueRowDataInterface[] | null =
    data.getCurrentOtherIncomeValue();

  const currentOtherIncomeVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getOtherIncomeValueVsPy();

  const currentOtherIncomeVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getOtherIncomeValueVsPyPercentage();

  // extract results from objects
  const currentOtherIncomeResult: singleValueRowDataInterface | null =
    (currentOtherIncomeData
      ? _.find(currentOtherIncomeData, { name: filteredEntity })
      : null) || null;

  const currentOtherIncomeVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOtherIncomeVsPy
      ? _.find(currentOtherIncomeVsPy, { name: filteredEntity })
      : null) || null;
  const currentOtherIncomeVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOtherIncomeVsPyPercentage
      ? _.find(currentOtherIncomeVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End Other Income-related --------//

  // --------- Other Expense-related --------- //
  const currentOtherExpensesData: singleValueRowDataInterface[] | null =
    data.getCurrentOtherExpensesValue();

  const currentOtherExpensesVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getOtherExpensesValueVsPy();

  const currentOtherExpensesVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getOtherExpensesValueVsPyPercentage();

  // extract results from objects
  const currentOtherExpensesResult: singleValueRowDataInterface | null =
    (currentOtherExpensesData
      ? _.find(currentOtherExpensesData, { name: filteredEntity })
      : null) || null;

  const currentOtherExpensesVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentOtherExpensesVsPy
      ? _.find(currentOtherExpensesVsPy, { name: filteredEntity })
      : null) || null;
  const currentOtherExpensesVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentOtherExpensesVsPyPercentage
      ? _.find(currentOtherExpensesVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End Other Expense-related --------//

  // --------- EBITDA-related --------- //
  const currentEbitdaData: singleValueRowDataInterface[] | null =
    data.getCurrentEbitdaValue();
  const currentInterestAndTaxesData: singleValueRowDataInterface[] | null =
    data.getCurrentInterestAndTaxesValue();

  const currentEbitdaVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getEbitdaValueVsPy();
  const currentInterestAndTaxesVsPy:
    | singleValueBooleanRowDataInterface[]
    | null = data.getEbitdaValueVsPy();

  const currentEbitdaVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getEbitdaValueVsPyPercentage();
  const currentInterestAndTaxesVsPyPercentage:
    | singleValueRowDataInterface[]
    | null = data.getInterestAndTaxesVsPyPercentage();

  // extract results from objects
  const currentEbitdaResult: singleValueRowDataInterface | null =
    (currentEbitdaData
      ? _.find(currentEbitdaData, { name: filteredEntity })
      : null) || null;
  const currentInterestAndTaxesResult: singleValueRowDataInterface | null =
    (currentInterestAndTaxesData
      ? _.find(currentInterestAndTaxesData, { name: filteredEntity })
      : null) || null;

  const currentEbitdaVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentEbitdaVsPy
      ? _.find(currentEbitdaVsPy, { name: filteredEntity })
      : null) || null;
  const currentInterestAndTaxesVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentInterestAndTaxesVsPy
      ? _.find(currentInterestAndTaxesVsPy, { name: filteredEntity })
      : null) || null;

  const currentEbitdaVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentEbitdaVsPyPercentage
      ? _.find(currentEbitdaVsPyPercentage, { name: filteredEntity })
      : null) || null;
  const currentInterestAndTaxesVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentInterestAndTaxesVsPyPercentage
      ? _.find(currentInterestAndTaxesVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End EBITDA-related --------//

  // --------- Net profit-related --------- //
  const currentNetProfitData: singleValueRowDataInterface[] | null =
    data.getCurrentNetProfit();

  const currentNetProfitVsPy: singleValueBooleanRowDataInterface[] | null =
    data.getNetProfitVsPy();

  const currentNetProfitVsPyPercentage: singleValueRowDataInterface[] | null =
    data.getNetProfitVsPyPercentage();

  // extract results from objects
  const currentNetProfitResult: singleValueRowDataInterface | null =
    (currentNetProfitData
      ? _.find(currentNetProfitData, { name: filteredEntity })
      : null) || null;

  const currentNetProfitVsPyResult: singleValueBooleanRowDataInterface | null =
    (currentNetProfitVsPy
      ? _.find(currentNetProfitVsPy, { name: filteredEntity })
      : null) || null;
  const currentNetProfitVsPyPercentageResult: singleValueRowDataInterface | null =
    (currentNetProfitVsPyPercentage
      ? _.find(currentNetProfitVsPyPercentage, { name: filteredEntity })
      : null) || null;
  // --------- End Net profit-related --------//

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
      currentOpexVsPyResult?.value != null
        ? currentOpexVsPyResult?.value
        : false, // false by default
      currentOpexVsPyPercentageResult?.value != null
        ? currentOpexVsPyPercentageResult?.value
        : 0
    ),

    // Commissions
    createIncomeStatementRowData(
      4,
      "Commissions",
      currentOpexCommissionsResult?.value != null
        ? currentOpexCommissionsResult?.value
        : 0,
      currentOpexCommissionsVsPyResult?.value != null
        ? currentOpexCommissionsVsPyResult?.value
        : false, // false by default
      currentOpexCommissionsVsPyPercentageResult?.value != null
        ? currentOpexCommissionsVsPyPercentageResult?.value
        : 0
    ),

    // Management Fee Expenses
    createIncomeStatementRowData(
      5,
      "Management Fee Expenses",
      currentOpexMgtFeeExpensesResult?.value != null
        ? currentOpexMgtFeeExpensesResult?.value
        : 0,
      currentOpexMgtFeeExpensesVsPyResult?.value != null
        ? currentOpexMgtFeeExpensesVsPyResult?.value
        : false, // false by default
      currentOpexMgtFeeExpensesVsPyPercentageResult?.value != null
        ? currentOpexMgtFeeExpensesVsPyPercentageResult?.value
        : 0
    ),

    // Professional & Legal Fees
    createIncomeStatementRowData(
      6,
      "Professional and Legal Fees",
      currentOpexProAndLegalFeesResult?.value != null
        ? currentOpexProAndLegalFeesResult?.value
        : 0,
      currentOpexProAndLegalFeesVsPyResult?.value != null
        ? currentOpexProAndLegalFeesVsPyResult?.value
        : false, // false by default
      currentOpexProAndLegalFeesVsPyPercentageResult?.value != null
        ? currentOpexProAndLegalFeesVsPyPercentageResult?.value
        : 0
    ),

    // Security & Janitorial
    createIncomeStatementRowData(
      7,
      "Security and Janitorial",
      currentOpexSecAndJanitorialResult?.value != null
        ? currentOpexSecAndJanitorialResult?.value
        : 0,
      currentOpexSecAndJanitorialVsPyResult?.value != null
        ? currentOpexSecAndJanitorialVsPyResult?.value
        : false, // false by default
      currentOpexSecAndJanitorialVsPyPercentageResult?.value != null
        ? currentOpexSecAndJanitorialVsPyPercentageResult?.value
        : 0
    ),

    // Taxes and Licenses
    createIncomeStatementRowData(
      8,
      "Taxes and Licenses",
      currentOpexTaxesAndLicensesResult?.value != null
        ? currentOpexTaxesAndLicensesResult?.value
        : 0,
      currentOpexTaxesAndLicensesVsPyResult?.value != null
        ? currentOpexTaxesAndLicensesVsPyResult?.value
        : false, // false by default
      currentOpexTaxesAndLicensesVsPyPercentageResult?.value != null
        ? currentOpexTaxesAndLicensesVsPyPercentageResult?.value
        : 0
    ),

    // Other Income
    createIncomeStatementRowData(
      9,
      "Other Income",
      currentOtherIncomeResult?.value != null
        ? currentOtherIncomeResult?.value
        : 0,
      currentOtherIncomeVsPyResult?.value != null
        ? currentOtherIncomeVsPyResult?.value
        : false, // false by default
      currentOtherIncomeVsPyPercentageResult?.value != null
        ? currentOtherIncomeVsPyPercentageResult?.value
        : 0
    ),

    // Other Expenses
    createIncomeStatementRowData(
      10,
      "Other Expenses",
      currentOtherExpensesResult?.value != null
        ? currentOtherExpensesResult?.value
        : 0,
      currentOtherExpensesVsPyResult?.value != null
        ? currentOtherExpensesVsPyResult?.value
        : false, // false by default
      currentOtherExpensesVsPyPercentageResult?.value != null
        ? currentOtherExpensesVsPyPercentageResult?.value
        : 0
    ),
    // EBITDA
    createIncomeStatementRowData(
      11,
      "EBITDA",
      currentEbitdaResult?.value != null ? currentEbitdaResult?.value : 0,
      currentEbitdaVsPyResult?.value != null
        ? currentEbitdaVsPyResult?.value
        : false, // false by default
      currentEbitdaVsPyPercentageResult?.value != null
        ? currentEbitdaVsPyPercentageResult?.value
        : 0
    ),

    // Interest and Tax
    createIncomeStatementRowData(
      12,
      "Interest and Taxes",
      currentInterestAndTaxesResult?.value != null
        ? currentInterestAndTaxesResult?.value
        : 0,
      currentInterestAndTaxesVsPyResult?.value != null
        ? currentInterestAndTaxesVsPyResult?.value
        : false, // false by default
      currentInterestAndTaxesVsPyPercentageResult?.value != null
        ? currentInterestAndTaxesVsPyPercentageResult?.value
        : 0
    ),

    // Net Profit
    createIncomeStatementRowData(
      13,
      "Net Profit",
      currentNetProfitResult?.value != null ? currentNetProfitResult?.value : 0,
      currentNetProfitVsPyResult?.value != null
        ? currentNetProfitVsPyResult?.value
        : false, // false by default
      currentNetProfitVsPyPercentageResult?.value != null
        ? currentNetProfitVsPyPercentageResult?.value
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
        onFileUpload={handleIncomeStatementChange}
        onRemoveFile={handleClearDataSources}
        isUploading={loading}
      />
      <main>
        <Routes>
          {/* Dashboard */}
          <Route
            path="/income-statement"
            element={
              <div className="dashboard-container">
                <IncomeStatementComponent
                  cardTitles={incomeStatementCardTitles}
                  chartData={chartData}
                  reload={reloadDashboard}
                  entityFilter={filteredEntity}
                />
              </div>
            }
          />
          {/* Balance Sheet */}
          <Route
            path="/balance-sheet"
            element={
              <div className="dashboard-container">
                <BalanceSheetComponent
                  cardTitles={balanceSheetCardTitles}
                  chartData={chartData}
                  reload={reloadDashboard}
                  entityFilter={filteredEntity}
                />
              </div>
            }
          />
          {/* Cash Flow */}
          <Route
            path="/cash-flow"
            element={
              <div className="dashboard-container">
                <CashFlowComponent
                  cardTitles={cashFlowCardTitles}
                  chartData={chartData}
                  reload={reloadDashboard}
                  entityFilter={filteredEntity}
                />
              </div>
            }
          />
        </Routes>
      </main>
      <main>
        <Routes>
          {/* Dashboard */}
          <Route
            path="/income-statement"
            element={
              <div className="dashboard-container">
                <IncomeStatementComponent
                  cardTitles={incomeStatementCardTitles}
                  chartData={chartData}
                  reload={reloadDashboard}
                  entityFilter={filteredEntity}
                />
              </div>
            }
          />
          {/* Balance Sheet */}
          <Route
            path="/balance-sheet"
            element={
              <div className="dashboard-container">
                <BalanceSheetComponent
                  cardTitles={balanceSheetCardTitles}
                  chartData={chartData}
                  reload={reloadDashboard}
                  entityFilter={filteredEntity}
                />
              </div>
            }
          />
          {/* Cash Flow */}
          <Route
            path="/cash-flow"
            element={
              <div className="dashboard-container">
                <CashFlowComponent
                  cardTitles={cashFlowCardTitles}
                  chartData={chartData}
                  reload={reloadDashboard}
                  entityFilter={filteredEntity}
                />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
