"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { ExplainerLevel } from '@/types/election';

interface AppState {
  country: string;
  setCountry: (country: string) => void;
  level: ExplainerLevel;
  setLevel: (level: ExplainerLevel) => void;
  completedQuizzes: Record<string, boolean>; // key format: countryId-phaseId
  markQuizCompleted: (countryId: string, phaseId: string) => void;
  unmarkQuizCompleted: (countryId: string, phaseId: string) => void;
  isCountryCompleted: (countryId: string, totalPhases: number) => boolean;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState('us');
  const [level, setLevel] = useState<ExplainerLevel>('standard');
  const [completedQuizzes, setCompletedQuizzes] = useState<Record<string, boolean>>({});

  const markQuizCompleted = (countryId: string, phaseId: string) => {
    const key = `${countryId}-${phaseId}`;
    setCompletedQuizzes(prev => {
      return { ...prev, [key]: true };
    });
  };

  const unmarkQuizCompleted = (countryId: string, phaseId: string) => {
    const key = `${countryId}-${phaseId}`;
    setCompletedQuizzes(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const isCountryCompleted = (countryId: string, totalPhases: number) => {
    const completedForCountry = Object.keys(completedQuizzes).filter(k => k.startsWith(`${countryId}-`));
    return completedForCountry.length >= totalPhases;
  };

  return (
    <AppContext.Provider value={{ country, setCountry, level, setLevel, completedQuizzes, markQuizCompleted, unmarkQuizCompleted, isCountryCompleted }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
