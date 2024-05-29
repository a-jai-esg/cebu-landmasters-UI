import cosInterface from "./objects/forms/graph-related/cosInterface";
import OperatingExpensesInterface from "./objects/forms/graph-related/operatingExpenseInterface";
import revenueInterface from "./objects/forms/graph-related/revenueInterface";
interface FinancialData {
  REVENUES: revenueInterface;
  COS: cosInterface;
  TOTAL_REVENUE: { value: number };
  TOTAL_COS: { value: number };
  TOTAL_GROSS_PROFIT: { value: number };
  TOTAL_OPERATING_EXPENSES: { value: number };
  OTHER_OPERATING_INCOME: { value: number };
  NET_OPERATING_INCOME: { value: number };
  TOTAL_OTHER_INCOME_OR_EXPENSE: { value: number };
  NET_PROFIT_BEFORE_TAX: {
    value: number;
  };
  TOTAL_NET_INCOME: {
    value: number;
  };
  TOTAL_NCI: {
    value: number;
  };
  TOTAL_NET_INCOME_ATTRIBUTABLE_TO_PARENT: {
    value: number;
  };
  CONSOLIDATED_NIAT: { value: number };
  PARENT_NIAT: { value: number | null };
  GPM: { value: number };
  OPEX_RATIO: { value: number };
  NP_MARGIN: { value: number };
  OPERATING_EXPENSES: OperatingExpensesInterface;
}

export default interface companyDataInterface {
  [key: string]: FinancialData;
}
