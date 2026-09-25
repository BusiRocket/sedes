/**
 * The control digit of the 7 digits of an entity NIF (Orden EHA/451/2008,
 * art. 3): add the digits in even positions, add the digit sum of twice each
 * digit in odd positions, and take ten minus the last digit of the total.
 */
export const entityControlDigit = (digits: string): number => {
  const base = 10
  let total = 0
  for (let index = 0; index < digits.length; index += 1) {
    const digit = Number(digits.charAt(index))
    if (index % 2 === 1) {
      total += digit
    } else {
      const doubled = digit * 2
      total += Math.floor(doubled / base) + (doubled % base)
    }
  }
  return (base - (total % base)) % base
}
