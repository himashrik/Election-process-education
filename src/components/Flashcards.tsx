"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, RotateCcw } from "lucide-react";

interface Flashcard {
  term: string;
  definition: string;
}

interface Props {
  cards: Flashcard[];
}

export function Flashcards({ cards }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) return null;

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-12">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Lightbulb className="text-yellow-500 w-6 h-6" />
          Knowledge Flashcards
        </h3>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
          {currentIndex + 1} / {cards.length}
        </span>
      </div>
      
      <div 
        className="relative h-64 w-full cursor-pointer perspective-1000 group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <Card className="absolute w-full h-full backface-hidden border-2 border-blue-200 dark:border-blue-900 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-blue-950 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: "hidden" }}>
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <span className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">Term</span>
              <h4 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {currentCard.term}
              </h4>
              <p className="absolute bottom-4 flex items-center gap-1 text-xs text-slate-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <RotateCcw className="w-3 h-3" /> Click to flip
              </p>
            </CardContent>
          </Card>

          {/* Back */}
          <Card className="absolute w-full h-full backface-hidden border-2 border-green-200 dark:border-green-900 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-green-950 flex flex-col items-center justify-center p-8 text-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <CardContent className="p-0 flex flex-col items-center justify-center h-full">
              <span className="text-sm font-bold tracking-widest text-green-500 uppercase mb-4">Definition</span>
              <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                {currentCard.definition}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={handlePrev}
          className="px-4 py-2 rounded-full font-semibold text-blue-600 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors active:scale-95"
        >
          Previous
        </button>
        <button 
          onClick={handleNext}
          className="px-6 py-2 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
        >
          Next Card
        </button>
      </div>
    </div>
  );
}
