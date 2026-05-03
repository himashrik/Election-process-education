"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";
import { ExplainerLevel } from "@/types/election";

export function ExplainerLevelToggle() {
  const { level, setLevel } = useAppContext();

  return (
    <div className="flex flex-col items-center sm:items-start space-y-2">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Explanation Detail Level:</span>
      <Tabs value={level} onValueChange={(val) => setLevel(val as ExplainerLevel)}>
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]" aria-label="Select explanation complexity level">
          <TabsTrigger value="simple">Simple (15yr old)</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="expert">Expert</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
