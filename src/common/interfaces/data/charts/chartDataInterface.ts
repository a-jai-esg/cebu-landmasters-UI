import multipleValuesRowDataInterface from "../objects/forms/multipleValuesRowDataInterface";
import singleValueRowDataInterface from "../objects/forms/singleValueRowDataInterface";

export default interface chartDataInterface {
  chartData: {
    gaugeData: singleValueRowDataInterface[];
    barData: multipleValuesRowDataInterface[];
    lineData: multipleValuesRowDataInterface[];
    pieData: singleValueRowDataInterface[];
  }[];
}
