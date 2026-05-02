export type ExplainerLevel = 'simple' | 'standard' | 'expert';

export interface GlossaryItem {
  term: string;
  definition: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface PhaseStep {
  id: string;
  title: string;
  explanations: Record<ExplainerLevel, string>;
  examples?: string[];
  glossary?: GlossaryItem[];
}

export interface ElectionPhase {
  id: string;
  title: string;
  description: string;
  steps: PhaseStep[];
  quiz: Record<ExplainerLevel, QuizQuestion[]>;
}

export interface EligibilityRules {
  ageRequired: number;
  citizenshipRequired: boolean;
  residencyRequired: boolean;
  notes: string;
}

export interface KeyDate {
  title: string;
  date: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CountryData {
  id: string;
  name: string;
  description: string;
  eligibility: EligibilityRules;
  keyDates: KeyDate[];
  phases: ElectionPhase[];
  faqs: FAQ[];
}
