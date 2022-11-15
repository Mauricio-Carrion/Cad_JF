export function capitalize(string) {
  let lowerString = string.toLowerCase()
  let capitalizeString = lowerString.charAt(0).toUpperCase() + lowerString.slice(1)

  return capitalizeString
}

