export function capitalize(string) {
  let lowerString = string.toLowerCase()
  let capitalizeString = lowerString.charAt(0).toUpperCase() + lowerString.slice(1)

  return capitalizeString
}

export function formatDate(dateString) {
  const newDate = new Date(dateString)
  const brDate = newDate.toLocaleString('pt-br')
  const date = brDate.split(' ')[0]
  const hour = brDate.split(' ')[1]

  return (`${date} - ${hour}H`)
}

