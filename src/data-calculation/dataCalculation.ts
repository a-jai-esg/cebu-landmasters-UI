import singleValueRowDataInterface from "../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import companyDataInterface from "../common/interfaces/data/companyDataInterface";
import operatingExpenseDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";
import operatingExpenseInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/operatingExpenseInterface";
import revenueDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/revenueDataInterface";
import revenueInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/revenueInterface";
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

  getRevenuePercentage = () =>
    this.calculatePercentageFromDataset(
      this.getCurrentRevenueValue(),
      this.getPreviousRevenueValue()
    );

  getCurrentCosValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.currentDataset) {
      if (this.currentDataset.hasOwnProperty(entity)) {
        const entityData =
          this.currentDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.total_cos : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getPreviousCosValue = (): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[] = [];

    for (const entity in this.previousDataset) {
      if (this.previousDataset.hasOwnProperty(entity)) {
        const entityData =
          this.previousDataset[entity as keyof companyDataInterface];
        const name: string = entity;
        const value: number | null = entityData ? entityData.total_cos : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getCosPercentage = () =>
    this.calculatePercentageFromDataset(
      this.getCurrentCosValue(),
      this.getPreviousCosValue()
    );

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

  getGrossProfitPercentage = () =>
    this.calculatePercentageFromDataset(
      this.getCurrentGrossProfitValue(),
      this.getPreviousGrossProfitValue()
    );

  getCurrentTotalOpexValue = (): singleValueRowDataInterface[] | null => {
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

  getPreviousTotalOpexValue = (): singleValueRowDataInterface[] | null => {
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

  getOpexPercentage = () =>
    this.calculatePercentageFromDataset(
      this.getCurrentTotalOpexValue(),
      this.getPreviousTotalOpexValue()
    );

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
          ? entityData.total_other_income_or_expense
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
          ? entityData.total_other_income_or_expense
          : null;

        data.push({ name, value });
      }
    }

    return data;
  };

  getOtherTotalOpexPercentage = () =>
    this.calculatePercentageFromDataset(
      this.getCurrentOtherTotalOperatingExpenses(),
      this.getPreviousOtherTotalOperatingExpenses()
    );

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

  getNetProfitBeforeTaxPercentage = () =>
    this.calculatePercentageFromDataset(
      this.getCurrentNetProfitBeforeTax(),
      this.getPreviousNetProfitBeforeTax()
    );

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

  // Dummy function to calculate percentage (implementation needed)
  private calculatePercentageFromDataset(
    currentDataset: singleValueRowDataInterface[] | null,
    previousDataset: singleValueRowDataInterface[] | null
  ): singleValueRowDataInterface[] | null {
    // Implementation goes here
    return null;
  }
}

export default DataCalculation;
