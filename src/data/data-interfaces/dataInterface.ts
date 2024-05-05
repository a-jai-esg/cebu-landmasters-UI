import OperatingExpenses from "./OperatingExpenses/operatingExpenses";

export default interface dataInterface {
  CONSOLIDATED_NIAT: number;
  PARENT_NIAT: number;
  GPM: number;
  OPEX_RATIO: number;
  NP_MARGIN: number;
  OPERATING_EXPENSES: OperatingExpenses;
}
