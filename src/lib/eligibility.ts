import { EligibilityRules } from "@/types/election";

/**
 * Validates user eligibility based on provided rules.
 * 
 * @param age - User's age as a number
 * @param isCitizen - "yes" or "no"
 * @param isResident - "yes" or "no"
 * @param rules - Eligibility rules for the selected country
 * @returns boolean - True if eligible, false otherwise
 */
export function checkUserEligibility(
  age: number,
  isCitizen: string | null,
  isResident: string | null,
  rules: EligibilityRules
): boolean {
  if (isNaN(age)) return false;

  const meetsAge = age >= rules.ageRequired;
  const meetsCitizenship = !rules.citizenshipRequired || isCitizen === "yes";
  const meetsResidency = !rules.residencyRequired || isResident === "yes";

  return meetsAge && meetsCitizenship && meetsResidency;
}
