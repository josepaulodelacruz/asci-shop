
function CurrencyFormat(amount) {
  let conString = amount.toString()
  let convertedAmount = conString.split("")
  convertedAmount.splice(1, 0, ".")
  convertedAmount.join("")
  return convertedAmount
}

export default CurrencyFormat;

