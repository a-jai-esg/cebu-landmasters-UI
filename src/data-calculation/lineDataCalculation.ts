import companyDataInterface from "../common/interfaces/data/companyDataInterface";
import singleValueRowDataInterface from "../common/interfaces/data/objects/forms/singleValueRowDataInterface";

export default class lineDataCalculation {
  dataset: companyDataInterface[];

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

  getConsolidatedNIAT(): singleValueRowDataInterface[] {
    const data: singleValueRowDataInterface[] = this.dataset.map((data) => {
      const name: string | null = Object.keys(data)[0];
      const value: number | null = data[name].CONSOLIDATED_NIAT.value;

      return { name, value }; // Removed backticks
    });
    return data;
  }
}
