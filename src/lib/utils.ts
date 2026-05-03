/**
 * Validates that country data contains all required fields.
 * Used to ensure data integrity across different election datasets.
 */
export function validateCountryData(data: any): boolean {
  if (!data) return false;
  
  const requiredFields = ['id', 'name', 'description', 'phases', 'eligibility', 'keyDates', 'faqs'];
  const hasAllFields = requiredFields.every(field => field in data);
  
  if (!hasAllFields) return false;
  
  // Validate phases
  if (!Array.isArray(data.phases) || data.phases.length === 0) return false;
  
  return true;
}

/**
 * Formats a percentage value for display.
 */
export function formatProgress(value: number): string {
  return `${Math.round(Math.max(0, Math.min(100, value)))}%`;
}
