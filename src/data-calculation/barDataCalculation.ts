import companyDataInterface from "../common/interfaces/data/companyDataInterface";

export default class barDataCalculation {
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
}
