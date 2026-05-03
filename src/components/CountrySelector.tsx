"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";

export function CountrySelector() {
  const { country, setCountry } = useAppContext();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Select Country:</span>
      <Select value={country} onValueChange={(val) => val && setCountry(val)}>
        <SelectTrigger className="w-[180px]" aria-label="Select Country">
          <SelectValue placeholder="Select a country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="india">India</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
