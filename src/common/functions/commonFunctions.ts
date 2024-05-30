export default class commonFunctions {
  // check comparison
  checkComparison = (currentValue: number, previousValue: number): boolean => {
    return currentValue > previousValue;
  };

  // format to two decimal places
  formatNumberToTwo = (value: number | null) => {
    const formattedValue = value != null ? value : 0;
    return new Intl.NumberFormat("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(formattedValue);
  };

  // format currency
  formatCurrencyToPHP = (value: number | null) => {
    const formattedValue = value != null ? value : 0;
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(formattedValue);
  };
}
