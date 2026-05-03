import { checkUserEligibility } from "../eligibility";
import { EligibilityRules } from "@/types/election";

describe("checkUserEligibility", () => {
  const mockRules: EligibilityRules = {
    ageRequired: 18,
    citizenshipRequired: true,
    residencyRequired: true,
    notes: "Basic rules"
  };

  test("should return true for valid eligible user", () => {
    expect(checkUserEligibility(20, "yes", "yes", mockRules)).toBe(true);
  });

  test("should return false if age is below required", () => {
    expect(checkUserEligibility(17, "yes", "yes", mockRules)).toBe(false);
  });

  test("should return false if citizenship is required but not met", () => {
    expect(checkUserEligibility(25, "no", "yes", mockRules)).toBe(false);
  });

  test("should return false if residency is required but not met", () => {
    expect(checkUserEligibility(25, "yes", "no", mockRules)).toBe(false);
  });

  test("should return true if citizenship is NOT required regardless of status", () => {
    const rulesNoCitizen = { ...mockRules, citizenshipRequired: false };
    expect(checkUserEligibility(25, "no", "yes", rulesNoCitizen)).toBe(true);
  });
});
