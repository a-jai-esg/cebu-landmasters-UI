import multipleValuesRowDataInterface from "../objects/forms/multipleValuesRowDataInterface";
import singleValueRowDataInterface from "../objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../operatingExpenseDataInterface";

export default interface chartDataInterface {
  chartData: {
    gaugeData: singleValueRowDataInterface[][];
    barData: multipleValuesRowDataInterface[];
    composedChartData: singleValueRowDataInterface[][];
    pieData: operatingExpenseDataInterface[][];
  }[];
}
