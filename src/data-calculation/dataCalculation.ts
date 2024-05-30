import _ from "lodash";
import companyDataInterface from "../common/interfaces/data/companyDataInterface";
import singleValueRowDataInterface from "../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/operatingExpenseDataInterface";
import operatingExpenseInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/operatingExpenseInterface";
import revenueDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/revenueDataInterface";
import revenueInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/revenueInterface";
import cosInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/cosInterface";
import cosDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/cosDataInterface";
import grossProfitDataInterface from "../common/interfaces/data/objects/forms/graph-related/data-interfaces/grossProfitDataInterface";
import grossProfitInterface from "../common/interfaces/data/objects/forms/graph-related/template-interfaces/grossProfitInterface";
// this is the data calculation class

export default class dataCalculation {
  previousDataset: companyDataInterface[];
  currentDataset: companyDataInterface[];

  CURRENT: string = "current";
  PREVIOUS: string = "previous";

  // receive the datasets through this constructor and everything gets calculated by each methods in this class.
  constructor(previousDataset: any[], currentDataset: any[]) {
    this.previousDataset = this.parseDataSource(previousDataset);
    this.currentDataset = this.parseDataSource(currentDataset);
  }

  private parseDataSource = (data: any[]): companyDataInterface[] => {
    return data.map((item) => {
      const key = Object.keys(item)[0]; // Extracting the company key
      const financialData = item[key];
      return { [key]: financialData };
    });
  };

  // the key (string) signifies as to what data is to be gathered:
  getConsolidatedNIAT = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      // get only the current data
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].CONSOLIDATED_NIAT.value;

        return { name, value }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].CONSOLIDATED_NIAT.value;

        return { name, value }; // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };

  getParentNIAT = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].PARENT_NIAT.value;
        return { name, value }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].PARENT_NIAT.value;
        return { name, value }; // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };

  getGPM = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].GPM.value;
        return { name, value }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toLowerCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].GPM.value;
        return { name, value };
      });
    } else {
      return null;
    }
    return data;
  };

  // ------------------ Revenue ---------------- //
  // get the current revenue value
  getCurrentRevenueValue = (): singleValueRowDataInterface[] | null => {
    const currentYearRevenue: singleValueRowDataInterface[] =
      this.currentDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_REVENUE.value;
        return { name, value };
      });
    return currentYearRevenue;
  };

  // get the previous revenue value
  getPreviousRevenueValue = (): singleValueRowDataInterface[] | null => {
    const previousYearRevenue: singleValueRowDataInterface[] =
      this.previousDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_REVENUE.value;
        return { name, value };
      });
    return previousYearRevenue;
  };

  // get the revenue percentage value
  getRevenuePercentage = (
    key: string
  ): singleValueRowDataInterface[] | null => {
    let percentage: singleValueRowDataInterface[] | null = null;
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      // Get the revenue for the current year of each entity
      const currentYearRevenue: singleValueRowDataInterface[] | null =
        this.getCurrentRevenueValue();

      const previousYearRevenue: singleValueRowDataInterface[] | null =
        this.getPreviousRevenueValue();

      // calculate percentage
      percentage = _.map(currentYearRevenue, (currentItem) => {
        const previousItem = _.find(previousYearRevenue, {
          name: currentItem.name,
        });

        const previousValue: number | null =
          previousItem != null ? previousItem.value : 0;

        const difference: number | null =
          currentItem.value != null
            ? currentItem.value - (previousValue != null ? previousValue : 0)
            : null;

        const percentageIncrease =
          previousValue !== 0
            ? ((difference != null ? difference : 0) /
                (previousValue != null ? previousValue : 0)) *
              100
            : 0;

        return {
          name: currentItem.name,
          value: percentageIncrease,
        };
      });
    }
    return percentage;
  };

  // get revenue for different entities
  getRevenuePerBU = (key: string): revenueDataInterface[] | null => {
    let data: revenueDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];

        const saleOfRealEstates: number | null =
          data[name].REVENUES.sale_of_real_estates;
        const rental: number | null = data[name].REVENUES.rental;
        const managementFees: number | null =
          data[name].REVENUES.management_fees;
        const hotelOperations: number | null =
          data[name].REVENUES.hotel_operations;

        const revenues: revenueInterface = {
          sale_of_real_estates: saleOfRealEstates,
          rental: rental,
          management_fees: managementFees,
          hotel_operations: hotelOperations,
        };
        return { name, revenues }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];

        const saleOfRealEstates: number | null =
          data[name].REVENUES.sale_of_real_estates;
        const rental: number | null = data[name].REVENUES.rental;
        const managementFees: number | null =
          data[name].REVENUES.management_fees;
        const hotelOperations: number | null =
          data[name].REVENUES.hotel_operations;

        const revenues: revenueInterface = {
          sale_of_real_estates: saleOfRealEstates,
          rental: rental,
          management_fees: managementFees,
          hotel_operations: hotelOperations,
        };
        return { name, revenues }; // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };

  // ------------------ End Revenue ---------------- //

  // ------------------ COS ---------------- //
  // get the current COS value
  getCurrentCosValue = (): singleValueRowDataInterface[] | null => {
    const currentYearCos: singleValueRowDataInterface[] =
      this.currentDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_COS.value;
        return { name, value };
      });
    return currentYearCos;
  };

  // get the previous COS value
  getPreviousCosValue = (): singleValueRowDataInterface[] | null => {
    const previousYearCos: singleValueRowDataInterface[] =
      this.previousDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_COS.value;
        return { name, value };
      });
    return previousYearCos;
  };

  getCosPercentage = (key: string): singleValueRowDataInterface[] | null => {
    let percentage: singleValueRowDataInterface[] | null = null;
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      // Get the revenue for the current year of each entity
      const currentYearCos: singleValueRowDataInterface[] | null =
        this.getCurrentCosValue();

      const previousYearCos: singleValueRowDataInterface[] | null =
        this.getPreviousCosValue();

      // calculate percentage
      percentage = _.map(currentYearCos, (currentItem) => {
        const previousItem = _.find(previousYearCos, {
          name: currentItem.name,
        });

        const previousValue: number | null =
          previousItem != null ? previousItem.value : 0;

        const difference: number | null =
          currentItem.value != null
            ? currentItem.value - (previousValue != null ? previousValue : 0)
            : null;

        const percentageIncrease =
          previousValue !== 0
            ? ((difference != null ? difference : 0) /
                (previousValue != null ? previousValue : 0)) *
              100
            : 0;

        return {
          name: currentItem.name,
          value: percentageIncrease,
        };
      });
    }
    return percentage;
  };

  // for different entities
  getCosPerBU = (key: string): cosDataInterface[] | null => {
    let data: cosDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];

        const cosRealEstates: number | null = data[name].COS.cos_real_estates;
        const cosDepreciation: number | null = data[name].COS.cos_depreciation;
        const cosTaxes: number | null = data[name].COS.cos_taxes;
        const cosSalariesAndOtherBenefits: number | null =
          data[name].COS.cos_salaries_and_other_benefits;
        const cosHotel: number | null = data[name].COS.cos_hotel;

        const cos: cosInterface = {
          cos_real_estates: cosRealEstates,
          cos_depreciation: cosDepreciation,
          cos_taxes: cosTaxes,
          cos_salaries_and_other_benefits: cosSalariesAndOtherBenefits,
          cos_hotel: cosHotel,
        };
        return { name, cos }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];

        const cosRealEstates: number | null = data[name].COS.cos_real_estates;
        const cosDepreciation: number | null = data[name].COS.cos_depreciation;
        const cosTaxes: number | null = data[name].COS.cos_taxes;
        const cosSalariesAndOtherBenefits: number | null =
          data[name].COS.cos_salaries_and_other_benefits;
        const cosHotel: number | null = data[name].COS.cos_hotel;

        const cos: cosInterface = {
          cos_real_estates: cosRealEstates,
          cos_depreciation: cosDepreciation,
          cos_taxes: cosTaxes,
          cos_salaries_and_other_benefits: cosSalariesAndOtherBenefits,
          cos_hotel: cosHotel,
        };
        return { name, cos }; // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };
  // ------------------ End COS ---------------- //

  // ------------------ Gross profit-related ---------------- //
  // get the current Gross Profit value
  getCurrentGrossProfitValue = (): singleValueRowDataInterface[] | null => {
    const currentYearGrossProfit: singleValueRowDataInterface[] =
      this.currentDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_GROSS_PROFIT.value;
        return { name, value };
      });
    return currentYearGrossProfit;
  };

  // get the previous Gross Profit value
  getPreviousGrossProfitValue = (): singleValueRowDataInterface[] | null => {
    const previousYearGrossProfit: singleValueRowDataInterface[] =
      this.previousDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_GROSS_PROFIT.value;
        return { name, value };
      });
    return previousYearGrossProfit;
  };

  getGrossProfitPercentage = (
    key: string
  ): singleValueRowDataInterface[] | null => {
    let percentage: singleValueRowDataInterface[] | null = null;
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      // Get the revenue for the current year of each entity
      const currentYearGrossProfit: singleValueRowDataInterface[] | null =
        this.getCurrentGrossProfitValue();

      const previousYearGrossProfit: singleValueRowDataInterface[] | null =
        this.getPreviousGrossProfitValue();

      // calculate percentage
      percentage = _.map(currentYearGrossProfit, (currentItem) => {
        const previousItem = _.find(previousYearGrossProfit, {
          name: currentItem.name,
        });

        const previousValue: number | null =
          previousItem != null ? previousItem.value : 0;

        const difference: number | null =
          currentItem.value != null
            ? currentItem.value - (previousValue != null ? previousValue : 0)
            : null;

        const percentageIncrease =
          previousValue !== 0
            ? ((difference != null ? difference : 0) /
                (previousValue != null ? previousValue : 0)) *
              100
            : 0;

        return {
          name: currentItem.name,
          value: percentageIncrease,
        };
      });
    }
    return percentage;
  };

  // for different entities
  getGrossProfitPerBU = (key: string): grossProfitDataInterface[] | null => {
    let data: grossProfitDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];

        const grossProfitSaleOfRealEstates: number | null =
          data[name].GROSS_PROFIT.gp_sale_of_real_estates;
        const grossProfitRental: number | null =
          data[name].GROSS_PROFIT.gp_rental;
        const grossProfitManagementFees: number | null =
          data[name].GROSS_PROFIT.gp_management_fees;
        const grossProfitHotelOperations: number | null =
          data[name].GROSS_PROFIT.gp_hotel_operations;

        const grossProfit: grossProfitInterface = {
          gp_sale_of_real_estates: grossProfitSaleOfRealEstates,
          gp_rental: grossProfitRental,
          gp_management_fees: grossProfitManagementFees,
          gp_hotel_operations: grossProfitHotelOperations,
        };
        return { name, grossProfit }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];

        const grossProfitSaleOfRealEstates: number | null =
          data[name].GROSS_PROFIT.gp_sale_of_real_estates;
        const grossProfitRental: number | null =
          data[name].GROSS_PROFIT.gp_rental;
        const grossProfitManagementFees: number | null =
          data[name].GROSS_PROFIT.gp_management_fees;
        const grossProfitHotelOperations: number | null =
          data[name].GROSS_PROFIT.gp_hotel_operations;

        const grossProfit: grossProfitInterface = {
          gp_sale_of_real_estates: grossProfitSaleOfRealEstates,
          gp_rental: grossProfitRental,
          gp_management_fees: grossProfitManagementFees,
          gp_hotel_operations: grossProfitHotelOperations,
        };
        return { name, grossProfit }; // Removed backticks // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };
  // ------------------ End Gross profit-related ---------------- //

  // ------------------ OPEX-related ------------------ //
  // get the current Gross Profit value
  getCurrentOpexValue = (): singleValueRowDataInterface[] | null => {
    const currentYearOpex: singleValueRowDataInterface[] =
      this.currentDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_OPERATING_EXPENSES.value;
        return { name, value };
      });
    return currentYearOpex;
  };

  // get the previous Gross Profit value
  getPreviousOpexValue = (): singleValueRowDataInterface[] | null => {
    const previousYearOpex: singleValueRowDataInterface[] =
      this.previousDataset.flatMap((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].TOTAL_OPERATING_EXPENSES.value;
        return { name, value };
      });
    return previousYearOpex;
  };

  getOpexPercentage = (key: string): singleValueRowDataInterface[] | null => {
    let percentage: singleValueRowDataInterface[] | null = null;
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      // Get the revenue for the current year of each entity
      const currentYearOpex: singleValueRowDataInterface[] | null =
        this.getCurrentOpexValue();

      const previousYearOpex: singleValueRowDataInterface[] | null =
        this.getPreviousOpexValue();

      // calculate percentage
      percentage = _.map(currentYearOpex, (currentItem) => {
        const previousItem = _.find(previousYearOpex, {
          name: currentItem.name,
        });

        const previousValue: number | null =
          previousItem != null ? previousItem.value : 0;

        const difference: number | null =
          currentItem.value != null
            ? currentItem.value - (previousValue != null ? previousValue : 0)
            : null;

        const percentageIncrease =
          previousValue !== 0
            ? ((difference != null ? difference : 0) /
                (previousValue != null ? previousValue : 0)) *
              100
            : 0;

        return {
          name: currentItem.name,
          value: percentageIncrease,
        };
      });
    }
    return percentage;
  };

  // this applies only per entity
  getOpexPerBU = (key: string): operatingExpenseDataInterface[] | null => {
    let data: operatingExpenseDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
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
    } else if (key === this.CURRENT || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
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
    } else {
      return null;
    }
    return data;
  };

  getOpexRatio = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].OPEX_RATIO.value;

        return { name, value }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].OPEX_RATIO.value;

        return { name, value }; // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };

  // ------------------ End OPEX ------------------ //

  getNpMargin = (key: string): singleValueRowDataInterface[] | null => {
    let data: singleValueRowDataInterface[];
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      data = this.currentDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].NP_MARGIN.value;

        return { name, value }; // Removed backticks
      });
    } else if (key === this.PREVIOUS || key === this.PREVIOUS.toUpperCase()) {
      data = this.previousDataset.map((data) => {
        const name: string | null = Object.keys(data)[0];
        const value: number | null = data[name].NP_MARGIN.value;

        return { name, value }; // Removed backticks
      });
    } else {
      return null;
    }
    return data;
  };
}
