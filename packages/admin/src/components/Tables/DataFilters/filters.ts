export enum Options {
  EqualTo = "Igual que",
  LesThan = "Menor que",
  GreaterThan = "Mayor que",
  Between = "Entre",
}

export function filterNumberWithConditions<T extends object>(
  rows: Array<{ values: T }>,
  id: keyof T,
  filterValue: [number | undefined, number | undefined, string]
): Array<{ values: T }> {
  return rows.filter((row) => {
    const rowValue = (row.values[id] as unknown) as number;
    const operator = filterValue[2] as Options;
    const firstNumber = filterValue[0];

    const filterValueIsNotComputable = !filterValue || (filterValue && filterValue.length < 3);
    const thereIsNoNumberForEvaluation = operator !== Options.Between && firstNumber === undefined;

    if (filterValueIsNotComputable || (!filterValueIsNotComputable && thereIsNoNumberForEvaluation))
      return true;

    const secondNumber = filterValue[1];

    switch (operator) {
      case Options.EqualTo:
        return rowValue === firstNumber;
      case Options.LesThan:
        return rowValue < firstNumber;
      case Options.GreaterThan:
        return rowValue > firstNumber;
      case Options.Between:
        if (firstNumber === undefined && secondNumber === undefined) return true;
        return valueIsBetween(rowValue, firstNumber, secondNumber);
      default:
        return true;
    }
  });
}

export function valueIsBetween(value: number, firstNumber = 0, secondNumber = 0) {
  if (
    (value <= firstNumber && value >= secondNumber) ||
    (value >= firstNumber && value <= secondNumber)
  )
    return true;

  return false;
}
