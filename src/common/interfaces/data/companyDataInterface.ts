import OperatingExpensesInterface from "./operatingExpenseInterface";
// interface OperatingExpenses {
//   advertising: number | null;
//   association_dues: number | null;
//   commissions: number | null;
//   communications: number | null;
//   depreciation_and_amortization: number | null;
//   donations: number | null;
//   fuel_and_lubricants: number | null;
//   impairment_losses: number | null;
//   insurance: number | null;
//   management_fee_expense: number | null;
//   move_in_fees_cost_of_services: number | null;
//   penalties: number | null;
//   professional_and_legal_fees: number | null;
//   rent: number | null;
//   repairs_and_maintenance: number | null;
//   representation_and_entertainment: number | null;
//   salaries_and_employee_benefits: number | null;
//   security_and_janitorial_services: number | null;
//   subscription_and_membership_dues: number | null;
//   supplies: number | null;
//   taxes_and_licenses: number | null;
//   trainings_and_seminars: number | null;
//   transportation_and_travel: number | null;
//   utilities: number | null;
//   others_operating_expenses: number | null;
// }

interface FinancialData {
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
