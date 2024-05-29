import _ from "lodash";
import companyDataInterface from "../common/interfaces/data/companyDataInterface";
import singleValueRowDataInterface from "../common/interfaces/data/objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../common/interfaces/data/objects/forms/graph-related/operatingExpenseDataInterface";
import operatingExpenseInterface from "../common/interfaces/data/objects/forms/graph-related/operatingExpenseInterface";
import revenueDataInterface from "../common/interfaces/data/objects/forms/graph-related/revenueDataInterface";
import revenueInterface from "../common/interfaces/data/objects/forms/graph-related/revenueInterface";
import cosInterface from "../common/interfaces/data/objects/forms/graph-related/cosInterface";
import cosDataInterface from "../common/interfaces/data/objects/forms/graph-related/cosDataInterface";
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
  getCosPercentage = (key: string): singleValueRowDataInterface[] | null => {
    let percentage: singleValueRowDataInterface[] | null = null;
    if (key === this.CURRENT || key === this.CURRENT.toUpperCase()) {
      // Get the revenue for the current year of each entity
      const currentYearCos: singleValueRowDataInterface[] =
        this.currentDataset.flatMap((data) => {
          const name: string | null = Object.keys(data)[0];
          const value: number | null = data[name].TOTAL_COS.value;
          return { name, value };
        });

      const previousYearCos: singleValueRowDataInterface[] =
        this.previousDataset.flatMap((data) => {
          const name: string | null = Object.keys(data)[0];
          const value: number | null = data[name].TOTAL_COS.value;
          return { name, value };
        });

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

        const cosRealEstates: number | null =
          data[name].REVENUES.sale_of_real_estates;
        const cosDepreciation: number | null = data[name].REVENUES.rental;
        const cosTaxes: number | null = data[name].REVENUES.management_fees;
        const cosSalariesAndOtherBenefits: number | null =
          data[name].REVENUES.hotel_operations;
        const cosHotel: number | null = data[name].REVENUES.hotel_operations;

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

        const cosRealEstates: number | null =
          data[name].REVENUES.sale_of_real_estates;
        const cosDepreciation: number | null = data[name].REVENUES.rental;
        const cosTaxes: number | null = data[name].REVENUES.management_fees;
        const cosSalariesAndOtherBenefits: number | null =
          data[name].REVENUES.hotel_operations;
        const cosHotel: number | null = data[name].REVENUES.hotel_operations;

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

  // this applies only per entity
  getOpexPerEntity = (key: string): operatingExpenseDataInterface[] | null => {
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
