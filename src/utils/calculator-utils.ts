export const formatValue = (
  value: string,
  trailingDecimal: boolean = false,
) => {
  if (value === '') return '0'; // Empty value should display 0
  let newValue = '';
  let isNeg = false;
  let decimal = '';

  if (value[0] === '-') {
    isNeg = true;
    value = value.substring(1);
  }

  // Extract decimal segment if there is one to add back in later
  if (value.indexOf('.') !== -1) {
    decimal = value.substring(value.indexOf('.'));
    value = value.substring(0, value.indexOf('.'));
  }

  // Add a comma for every three numbers we have going from right to left
  let c = 1;
  for (let i = value.length - 1; i >= 0; i--) {
    newValue = value[i] + newValue;
    if (c % 3 === 0 && c !== value.length) {
      newValue = ',' + newValue;
    }
    c++;
  }

  // Add back in the negative sign
  if (isNeg) {
    newValue = '-' + newValue;
  }

  // remove trailing 0's from decimal
  while (decimal[decimal.length - 1] === '0') {
    decimal = decimal.substring(0, decimal.length - 1);
  }

  // If we dont want a trailing decimal remove it
  // For things like the typing display we need it though
  if (decimal === '.' && !trailingDecimal) {
    decimal = '';
  }

  return newValue + decimal;
};
