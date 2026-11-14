/**
 * Indian Rupee (₹) formatting utilities
 * Handles both full Indian number formatting (e.g., ₹1,50,000)
 * and compact crore/lakh representations (e.g., ₹2.5 Lakhs, ₹1.4 Cr).
 */

export function formatINR(amount: number, compact: boolean = false): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));

  if (compact) {
    if (absAmount >= 10000000) {
      const cr = (absAmount / 10000000).toFixed(2);
      return `${isNegative ? '-' : ''}₹${cr.replace(/\.00$/, '')} Cr`;
    }
    if (absAmount >= 100000) {
      const lakh = (absAmount / 100000).toFixed(2);
      return `${isNegative ? '-' : ''}₹${lakh.replace(/\.00$/, '')} Lakh`;
    }
    if (absAmount >= 1000) {
      const k = (absAmount / 1000).toFixed(1);
      return `${isNegative ? '-' : ''}₹${k.replace(/\.0$/, '')}K`;
    }
  }

  // Standard Indian comma separator format: 1,00,00,000
  const numStr = absAmount.toString();
  let lastThree = numStr.substring(numStr.length - 3);
  const otherNumbers = numStr.substring(0, numStr.length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;

  return `${isNegative ? '-' : ''}₹${formatted}`;
}
