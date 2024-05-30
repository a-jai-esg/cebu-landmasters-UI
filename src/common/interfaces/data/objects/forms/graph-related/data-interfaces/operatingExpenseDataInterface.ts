import OperatingExpensesInterface from "../template-interfaces/operatingExpenseInterface";

export default interface OperatingExpenseDataInterface {
  name: string | null;
  expenses: OperatingExpensesInterface | null;
}
