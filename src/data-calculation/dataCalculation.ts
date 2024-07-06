import singleValueRowDataInterface from "../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import companyDataInterface from "../common/interfaces/data/companyDataInterface";
import operatingExpenseDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";
import operatingExpenseInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/operatingExpenseInterface";
import revenueDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/revenueDataInterface";
import revenueInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/revenueInterface";
import singleValueBooleanRowDataInterface from "../common/interfaces/data/objects/forms/singleValueBooleanRowDataInterface";
class DataCalculation {
  private currentDataset: companyDataInterface | null;
  private previousDataset: companyDataInterface | null;
  private CURRENT = "current";
  private PREVIOUS = "previous";

  constructor(
    currentDataset: companyDataInterface | null,
    previousDataset: companyDataInterface | null
  ) {
    this.currentDataset = currentDataset;
    this.previousDataset = previousDataset;
  }

  getParentNIAT = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.parent_niat : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getRevenuePerBU = (key: string): revenueDataInterface[] | null => {
    let data: revenueDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;

        const revenues: revenueInterface = {
          sale_of_real_estates: entityData
            ? entityData.revenues_sales_of_real_estates
            : null,
          rental: entityData ? entityData.revenues_rental : null,
          management_fees: entityData
            ? entityData.revenues_management_fees
            : null,
          hotel_operations: entityData
            ? entityData.revenues_hotel_operations
            : null,
        };

        data.push({ name, revenues });
      }
    }

    return data;
  };

  getOpexPerBU = (key: string): operatingExpenseDataInterface[] | null => {
    let data: operatingExpenseDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;

        const expenses: operatingExpenseInterface = {
          commissions: entityData
            ? entityData.operating_expenses_commissions
            : null,
          management_fee_expense: entityData
            ? entityData.operating_expenses_management_fee_expense
            : null,
          professional_and_legal_fees: entityData
            ? entityData.operating_expenses_professional_and_legal_fees
            : null,
          security_and_janitorial_services: entityData
            ? entityData.operating_expenses_security_and_janitorial_services
            : null,
          taxes_and_licenses: entityData
            ? entityData.operating_expenses_taxes_and_licenses
            : null,
        };

        data.push({ name, expenses });
      }
    }
    return data;
  };

  getConsolidatedNIAT = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.consolidated_niat
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getGPM = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.gpm : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // --- Revenue --- //

  getCurrentRevenueValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_revenue
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousRevenueValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_revenue
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getRevenueVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.revenue_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getRevenueVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.revenue_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // -- COS -- //

  getCurrentCogsValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.total_cogs : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousCogsValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.total_cogs : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getCogsVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData ? entityData.cogs_vs_py : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getCogsVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.cogs_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // -- Gross Profit -- //

  getCurrentGrossProfitValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_gross_profit
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousGrossProfitValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_gross_profit
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getGrossProfitVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.gross_profit_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getGrossProfitVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.gross_profit_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // -- OPEX --//

  getCurrentOpexValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_operating_expenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousOpexValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_operating_expenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expense_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expense_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // commissions
  getOpexCurrentCommissionsValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_commissions
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexPreviousCommissionsValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_commissions
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexCommissionsVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expense_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getCommissionsVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expense_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // management fee expenses
  getCurrentOpexMgtFeeExpensesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_management_fee_expense
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousOpexMgtFeeExpensesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_management_fee_expense
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexMgtFeeExpensesVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expenses_management_fee_expense_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexMgtFeeExpenseVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_management_fee_expense_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // professional and legal fees
  getCurrentProAndLegalFeesValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_professional_and_legal_fees
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousProAndLegalFeesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_professional_and_legal_fees
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getProAndLegalFeesVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expenses_management_fee_expense_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getProAndLegalFeesVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_management_fee_expense_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // security and janitorial
  getCurrentSecAndJanitorialValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_security_and_janitorial_services
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousSecAndJanitorialValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_security_and_janitorial_services
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getSecAndJanitorialVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expenses_security_and_janitorial_services_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getSecAndJanitorialVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_security_and_janitorial_services_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // Taxes and Licenses
  getCurrentTaxesAndLicensesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_taxes_and_licenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousTaxesAndLicensesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_taxes_and_licenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getTaxesAndLicensesVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expenses_taxes_and_licenses_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getTaxesAndLicensesVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_taxes_and_licenses_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOpexRatio = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.opex_ratio : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getCurrentOtherTotalOperatingExpenses = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_operating_expenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousOtherTotalOperatingExpenses = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_operating_expenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // --- End OPEX --- //

  // other income
  getCurrentOtherIncomeValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.other_operating_income
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousOtherIncomeValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.other_operating_income
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOtherIncomeValueVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.other_income_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOtherIncomeValueVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.other_income_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // other expenses
  getCurrentOtherExpensesValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_other_income_or_expense
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousOtherExpensesValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.total_other_income_or_expense
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOtherExpensesValueVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.other_expense_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOtherExpenseValueVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.other_expense_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // ebit
  getCurrentEbitdaValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.ebitda : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousEbitdaValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.ebitda : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getEbitdaValueVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.ebitda_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getEbitdaValueVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.ebitda_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // interest and taxes
  getCurrentInterestAndTaxesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_taxes_and_licenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousInterestAndTaxesValue = ():
    | singleValueRowDataInterface[]
    | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expenses_taxes_and_licenses
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getInterestAndTaxesValueVsPy = () => {
    let data: singleValueBooleanRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: boolean | null = entityData
          ? entityData.operating_expense_vs_py
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getInterestAndTaxesVsPyPercentage = () => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.operating_expense_vs_py_percentage
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // net profit
  getCurrentNetProfitBeforeTax = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.net_profit_before_tax
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousNetProfitBeforeTax = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData
          ? entityData.net_profit_before_tax
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  // end other income
  getNpMargin = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    const dataset =
      key === this.CURRENT || key === this.CURRENT.toUpperCase()
        ? this.currentDataset
        : key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()
        ? this.previousDataset
        : null;

    if (!dataset) {
      return null;
    }

    for (const entity in dataset) {
      if (dataset.hasOwnProperty(entity)) {
        const entityData = dataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.np_margin : null;

        data.push({ name, value });
      }
    }

    return data;
  };
}

export default DataCalculation;
