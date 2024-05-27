import _ from "lodash";
import companyDataInterface from "../common/interfaces/data/companyDataInterface";
import singleValueRowDataInterface from "../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../common/interfaces/data/objects/forms/graph-related/operatingExpenseDataInterface";
import operatingExpenseInterface from "../common/interfaces/data/objects/forms/graph-related/operatingExpenseInterface";
import revenueDataInterface from "../common/interfaces/data/objects/forms/graph-related/revenueDataInterface";
import revenueInterface from "../common/interfaces/data/objects/forms/graph-related/revenueInterface";
// this is the data calculation class

export default class dataCalculation {
  dataset: companyDataInterface[];

  // receive the dataset through this constructor and everything gets calculated by each methods in this class.
  constructor(dataset: any[]) {
    this.dataset = this.parseDataSource(dataset);
  }

  private parseDataSource = (data: any[]): companyDataInterface[] => {
    return data.map((item) => {
      const key = Object.keys(item)[0]; // Extracting the company key
      const financialData = item[key];
      return { [key]: financialData };
    });
  };

  getConsolidatedNIAT = (): singleValueRowDataInterface[] => {
    const data: singleValueRowDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];
      const value: number | null = data[name].CONSOLIDATED_NIAT.value;

      return { name, value }; // Removed backticks
    });
    return data;
  };

  getParentNIAT = (): singleValueRowDataInterface[] => {
    const data: singleValueRowDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];
      const value: number | null = data[name].PARENT_NIAT.value;
      return { name, value }; // Removed backticks
    });
    return data;
  };

  getGPM = (): singleValueRowDataInterface[] => {
    const data: singleValueRowDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];
      const value: number | null = data[name].GPM.value;

      return { name, value }; // Removed backticks
    });
    return data;
  };

  getRevenuePerBU = (): revenueDataInterface[] => {
    const revenue: revenueDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];

      const dataCommissions: number | null =
        data[name].OPERATING_EXPENSES.commissions;
      const managementFeeExpense: number | null =
        data[name].OPERATING_EXPENSES.management_fee_expense;
      const professionalAndLegalFees: number | null =
        data[name].OPERATING_EXPENSES.professional_and_legal_fees;
      const securityAndJanitorialFees: number | null =
        data[name].OPERATING_EXPENSES.security_and_janitorial_services;
      const taxesAndLicenses: number | null =
        data[name].OPERATING_EXPENSES.taxes_and_licenses;

      const expenses: revenueInterface = {
        commissions: dataCommissions,
        management_fee_expense: managementFeeExpense,
        professional_and_legal_fees: professionalAndLegalFees,
        security_and_janitorial_services: securityAndJanitorialFees,
        taxes_and_licenses: taxesAndLicenses,
      };

      return { name, expenses }; // Removed backticks
    });
    return revenue;
  };

  // this applies only per entity
  getOpexPerEntity = (): operatingExpenseDataInterface[] => {
    const opex: operatingExpenseDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];

      const dataCommissions: number | null =
        data[name].OPERATING_EXPENSES.commissions;
      const managementFeeExpense: number | null =
        data[name].OPERATING_EXPENSES.management_fee_expense;
      const professionalAndLegalFees: number | null =
        data[name].OPERATING_EXPENSES.professional_and_legal_fees;
      const securityAndJanitorialFees: number | null =
        data[name].OPERATING_EXPENSES.security_and_janitorial_services;
      const taxesAndLicenses: number | null =
        data[name].OPERATING_EXPENSES.taxes_and_licenses;

      const expenses: operatingExpenseInterface = {
        commissions: dataCommissions,
        management_fee_expense: managementFeeExpense,
        professional_and_legal_fees: professionalAndLegalFees,
        security_and_janitorial_services: securityAndJanitorialFees,
        taxes_and_licenses: taxesAndLicenses,
      };

      return { name, expenses }; // Removed backticks
    });
    return opex;
  };

  getOpexRatio = (): singleValueRowDataInterface[] => {
    const data: singleValueRowDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];
      const value: number | null = data[name].OPEX_RATIO.value;

      return { name, value }; // Removed backticks
    });
    return data;
  };

  getNpMargin = (): singleValueRowDataInterface[] => {
    const data: singleValueRowDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];
      const value: number | null = data[name].NP_MARGIN.value;

      return { name, value }; // Removed backticks
    });
    return data;
  };
}
