export function toCurrencyBRL(value) {
    value = parseFloat(value);
    return value.toLocaleString('pt-br',{minimumFractionDigits: 2});
}

export const maskCurrency = (value, maxLength = 12, radix = ",") => {
    const currencyRegExp = new RegExp(
      `(\\d{1,${maxLength - 3}})(,)?(\\d{2})`,
      "g"
    );
    return value.replace(currencyRegExp, (match, p1, p2, p3) =>
      [p1, p3].join(radix)
    );
};