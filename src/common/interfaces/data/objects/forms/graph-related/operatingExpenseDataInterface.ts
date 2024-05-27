import OperatingExpensesInterface from "./operatingExpenseInterface";

export default interface OperatingExpenseDataInterface {
  name: string | null;
  expenses: OperatingExpensesInterface | null;
}
