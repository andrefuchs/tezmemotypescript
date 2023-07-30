export const CONTRACT_ADDRESS: string = "KT19reqmrieauywZK2SsJsxKyhYLscwfU4Qb";

export function formatPkhString(pkh: string = ""): string {
  return pkh.substring(0, 5) + "..." + pkh.substring(pkh.length - 4);
}

