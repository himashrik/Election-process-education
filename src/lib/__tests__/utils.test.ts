import { validateCountryData, formatProgress } from "../utils";

describe("Utility Functions", () => {
  describe("validateCountryData", () => {
    test("should return true for valid data", () => {
      const validData = {
        id: "test",
        name: "Test Country",
        description: "Desc",
        phases: [{ id: "p1", steps: [] }],
        eligibility: {},
        keyDates: [],
        faqs: []
      };
      expect(validateCountryData(validData)).toBe(true);
    });

    test("should return false for missing fields", () => {
      const invalidData = { id: "test" };
      expect(validateCountryData(invalidData)).toBe(false);
    });

    test("should return false for empty phases", () => {
      const invalidData = {
        id: "test",
        name: "Test",
        description: "Desc",
        phases: [],
        eligibility: {},
        keyDates: [],
        faqs: []
      };
      expect(validateCountryData(invalidData)).toBe(false);
    });
  });

  describe("formatProgress", () => {
    test("should round values", () => {
      expect(formatProgress(45.6)).toBe("46%");
    });

    test("should clamp values between 0 and 100", () => {
      expect(formatProgress(-10)).toBe("0%");
      expect(formatProgress(110)).toBe("100%");
    });
  });
});
