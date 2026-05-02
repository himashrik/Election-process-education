"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GlossaryItem } from "@/types/election";
import React from "react";

interface Props {
  text: string;
  glossary?: GlossaryItem[];
}

export function GlossaryText({ text, glossary }: Props) {
  if (!glossary || glossary.length === 0) {
    return <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{text}</p>;
  }

  // A simple way to replace terms with Tooltip is splitting by the term.
  // We'll iterate over glossary terms and build an array of React nodes.
  let elements: (string | React.ReactNode)[] = [text];

  glossary.forEach((item, index) => {
    const newElements: (string | React.ReactNode)[] = [];
    const termRegex = new RegExp(`\\b(${item.term})\\b`, "gi");

    elements.forEach((el, i) => {
      if (typeof el === "string") {
        const parts = el.split(termRegex);
        parts.forEach((part, j) => {
          if (part.toLowerCase() === item.term.toLowerCase()) {
            newElements.push(
              <Tooltip key={`term-${index}-${i}-${j}`}>
                <TooltipTrigger className="underline decoration-dashed decoration-slate-400 dark:decoration-slate-600 underline-offset-4 font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {part}
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-sm">
                  <p><strong>{item.term}:</strong> {item.definition}</p>
                </TooltipContent>
              </Tooltip>
            );
          } else if (part) {
            newElements.push(part);
          }
        });
      } else {
        newElements.push(el);
      }
    });
    elements = newElements;
  });

  return <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{elements.map((el, i) => React.Fragment ? <React.Fragment key={i}>{el}</React.Fragment> : el)}</p>;
}
