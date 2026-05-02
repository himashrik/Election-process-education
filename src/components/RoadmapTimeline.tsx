"use client";

import { ElectionPhase } from "@/types/election";
import { StepDetail } from "./StepDetail";
import { QuizCard } from "./QuizCard";
import { useAppContext } from "@/context/AppContext";
import { CheckCircle2, Circle } from "lucide-react";

interface Props {
  phases: ElectionPhase[];
}

export function RoadmapTimeline({ phases }: Props) {
  const { country, level, completedQuizzes } = useAppContext();

  return (
    <div className="space-y-12 relative pb-12">
      {phases.map((phase, idx) => {
        const isCompleted = completedQuizzes[`${country}-${phase.id}`];

        return (
          <div key={phase.id} className="relative">
            {/* Timeline connection line */}
            {idx !== phases.length - 1 && (
              <div className="absolute left-6 top-14 bottom-[-3rem] w-0.5 bg-slate-200 dark:bg-slate-800 z-0 hidden md:block" />
            )}

            <div className="flex flex-col md:flex-row gap-6 relative z-10">
              {/* Phase Indicator */}
              <div className="hidden md:flex flex-col items-center pt-2">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-4 ${
                  isCompleted ? 'bg-green-100 border-green-500 text-green-600' : 'bg-white border-blue-500 text-blue-600'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{idx + 1}</span>}
                </div>
              </div>

              {/* Phase Content */}
              <div className="flex-1">
                <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-900/50 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                    <div className="md:hidden w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-white border-blue-500 text-blue-600 text-sm font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{phase.title}</h2>
                      <p className="text-slate-600 dark:text-slate-400 mt-1">{phase.description}</p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-8">
                    {phase.steps.map((step) => (
                      <StepDetail key={step.id} step={step} />
                    ))}

                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                      <QuizCard phaseId={phase.id} phaseTitle={phase.title} questions={phase.quiz[level]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
