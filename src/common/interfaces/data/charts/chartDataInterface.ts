import singleValueRowDataInterface from "../objects/forms/singleValueRowDataInterface";
import operatingExpenseDataInterface from "../objects/forms/graph-related/operatingExpenseDataInterface";
import revenueDataInterface from "../objects/forms/graph-related/revenueDataInterface";
import incomeStatementRowDataInterface from "./incomeStatementRowDataInterface";

export default interface chartDataInterface {
  chartData: {
    gaugeData: singleValueRowDataInterface[][] | null;
    barData: revenueDataInterface[][] | null;
    composedChartData: singleValueRowDataInterface[][] | null;
    pieData: operatingExpenseDataInterface[][] | null;
    incomeStatementTableData: incomeStatementRowDataInterface[][] | null;
  }[];
}
