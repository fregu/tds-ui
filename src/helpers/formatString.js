export default function formatString(
  string,
  format,
  { unit, trim, decimals = 2 } = {}
) {
  if (string === null || string === undefined) {
    return
  }
  const thisYear = Number(String(new Date().getFullYear()))
  const formatString = String(string).replace(/[- ]/g, '')
  let resultString = formatString
  switch (format) {
    case 'fullDate':
    case 'date':
      const year = formatString.slice(-8, -4)
      resultString = `${
        year.length < 4
          ? (Number(year.slice(-2)) > Number(String(thisYear - 80).slice(-2))
              ? 19
              : 20) + year.slice(-2)
          : year
      }-${formatString.slice(-4, -2)}-${formatString.slice(-2)}`
      break
    case 'nationalIdNumber':
    case 'fullNationalIdNumber':
      const nationalIdString = `${formatString.slice(
        -10,
        -8
      )}${formatString.slice(-8, -6)}${formatString.slice(
        -6,
        -4
      )}-${formatString.slice(-4)}`
      resultString =
        format === 'fullNationalIdNumber'
          ? (Number(nationalIdString.slice(0, 2)) >
            Number(String(thisYear - 80).slice(-2))
              ? 19
              : 20) + nationalIdString
          : nationalIdString
      break
    case 'amount':
      if (isNaN(formatString)) {
        break
      }
      let pattern = /(-?\d+)(\d{3})/
      let parts = formatString.split(',')
      let amountString = parts[0]

      let dec =
        parts[1] &&
        decimals &&
        Math.abs(Number(parts[1]) - Math.round(parts[1])) > 0
          ? Math.round(parts[1] * Math.pow(10, decimals)) /
            Math.pow(10, decimals)
          : parts[1]

      while (pattern.test(amountString)) {
        amountString = amountString.replace(pattern, '$1 $2')
      }
      resultString = `${amountString}${parts.length > 1 ? ',' + dec : ''}`
      break
    case 'number':
      resultString = (!isNaN(formatString) && Number(formatString)) || 0
      if (
        decimals &&
        Math.abs(Number(resultString) - Math.round(Number(parts[1]))) > 0
      ) {
        const factor = Math.pow(10, decimals)
        resultString = Math.round(resultString * factor) / factor
      }
      break
    case 'tel':
    case 'phoneNumber':
      // 070 - 000 000 00
      let phoneString = formatString.replace(/^\+46/, '0')
      if (isNaN(phoneString) || phoneString.length < 10) {
        return string
      }
      resultString = `${phoneString.slice(0, 3)} - ${phoneString.slice(
        3,
        6
      )} ${phoneString.slice(
        6,
        phoneString.length > 10 ? 9 : 8
      )} ${phoneString.slice(phoneString.length > 10 ? 9 : 8, 12)}`
      break
    case 'name':
      resultString = string
        .split(' ')
        .map(part => part.replace(/^\w/, c => c.toUpperCase()) || part)
        .join(' ')
      break
  }
  return `${trim ? resultString.replace(/[- ]/g, '') : resultString}${
    unit ? ' ' + unit : ''
  }`
}
