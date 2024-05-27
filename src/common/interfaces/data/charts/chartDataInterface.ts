import singleValueRowDataInterface from "../objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../objects/forms/graph-related/operatingExpenseDataInterface";

export default interface chartDataInterface {
  chartData: {
    gaugeData: singleValueRowDataInterface[][];
    barData: singleValueRowDataInterface[][];
    composedChartData: singleValueRowDataInterface[][];
    pieData: operatingExpenseDataInterface[][];
  }[];
}
