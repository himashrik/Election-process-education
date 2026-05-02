"use client";

import { PhaseStep } from "@/types/election";
import { useAppContext } from "@/context/AppContext";
import { GlossaryText } from "./GlossaryText";
import { Lightbulb } from "lucide-react";

interface Props {
  step: PhaseStep;
}

export function StepDetail({ step }: Props) {
  const { level } = useAppContext();

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{step.title}</h3>
      
      <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-4 border border-slate-100 dark:border-slate-800">
        <GlossaryText text={step.explanations[level]} glossary={step.glossary} />
      </div>

      {step.examples && step.examples.length > 0 && (
        <div className="flex gap-2 items-start mt-3 p-3 bg-blue-50/50 rounded-lg border border-blue-100/50">
          <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Examples:</h4>
            <ul className="list-disc pl-4 space-y-1 text-sm text-slate-600 dark:text-slate-400">
              {step.examples.map((ex, idx) => (
                <li key={idx}><GlossaryText text={ex} glossary={step.glossary} /></li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
