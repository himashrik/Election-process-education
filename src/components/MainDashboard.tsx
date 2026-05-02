"use client";

import { useAppContext } from "@/context/AppContext";
import { CountryData } from "@/types/election";
import { CountrySelector } from "@/components/CountrySelector";
import { ExplainerLevelToggle } from "@/components/ExplainerLevelToggle";
import { RoadmapTimeline } from "@/components/RoadmapTimeline";
import { EligibilityForm } from "@/components/EligibilityForm";
import { KeyDatesTracker } from "@/components/KeyDatesTracker";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Flashcards } from "@/components/Flashcards";

interface Props {
  countriesData: Record<string, CountryData>;
}

export function MainDashboard({ countriesData }: Props) {
  const { country, completedQuizzes } = useAppContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = countriesData[country];
  
  const flashcards = useMemo(() => {
    if (!data) return [];
    const cards: {term: string, definition: string}[] = [];
    data.phases.forEach(p => {
      p.steps.forEach(s => {
        if (s.glossary) cards.push(...s.glossary);
      });
    });
    // Remove duplicates
    return cards.filter((v, i, a) => a.findIndex(t => t.term === v.term) === i);
  }, [data]);
  
  if (!data || !mounted) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Calculate progress
  const totalPhases = data.phases.length;
  const completedPhasesForCountry = Object.keys(completedQuizzes).filter(k => k.startsWith(`${country}-`)).length;
  const progressPercentage = totalPhases > 0 ? (completedPhasesForCountry / totalPhases) * 100 : 0;



  return (
    <div className="pb-24">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">ElectionEd</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <CountrySelector />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-4 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              <span>Your Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Header Section */}
        <motion.section 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 12, delay: 0.1 }}
          className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden"
        >
          <motion.div 
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            animate={{ rotate: 10, scale: 1, opacity: 0.1 }}
            transition={{ type: "spring", stiffness: 50, repeat: Infinity, repeatType: "reverse", duration: 5 }}
            className="absolute top-0 right-0 p-8 pointer-events-none"
          >
            <GraduationCap className="w-64 h-64" />
          </motion.div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4">
              How Elections Work in {data.name}
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              {data.description}
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 inline-block">
              <ExplainerLevelToggle />
            </div>
          </div>
        </motion.section>

        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Roadmap */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">The Election Roadmap</h3>
              <RoadmapTimeline phases={data.phases} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <EligibilityForm rules={data.eligibility} />
            <KeyDatesTracker dates={data.keyDates} />
          </div>

        </div>

        {/* Flashcards */}
        {flashcards.length > 0 && (
          <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            <Flashcards cards={flashcards} />
          </section>
        )}

        {/* FAQs */}
        <section className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <FaqAccordion faqs={data.faqs} />
        </section>

      </main>
    </div>
  );
}
