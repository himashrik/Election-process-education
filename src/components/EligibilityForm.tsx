"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { checkUserEligibility } from "@/lib/eligibility";
import { EligibilityRules } from "@/types/election";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  rules: EligibilityRules;
}

/**
 * EligibilityForm Component
 * 
 * Allows users to verify their voting eligibility based on regional rules.
 * Uses a modular library for validation logic to ensure high testability.
 * 
 * @param rules - The regional eligibility rules from the dataset
 */
export function EligibilityForm({ rules }: Props) {
  const [age, setAge] = useState<string>("");
  const [isCitizen, setIsCitizen] = useState<string | null>(null);
  const [isResident, setIsResident] = useState<string | null>(null);
  const [result, setResult] = useState<"eligible" | "ineligible" | null>(null);

  const checkEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(age);
    
    if (checkUserEligibility(ageNum, isCitizen, isResident, rules)) {
      setResult("eligible");
    } else {
      setResult("ineligible");
    }
  };

  return (
    <Card className="shadow-md border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 pb-4">
        <CardTitle className="text-xl text-slate-800 dark:text-slate-100">Can I Vote?</CardTitle>
        <CardDescription>Check your eligibility based on current rules.</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={checkEligibility} className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="age" className="text-slate-700 dark:text-slate-300">How old are you?</Label>
            <Input 
              id="age" 
              type="number" 
              min="0" 
              max="120"
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              placeholder="e.g. 20"
              required
              className="max-w-xs"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700 dark:text-slate-300">Are you a citizen?</Label>
            <RadioGroup value={isCitizen || ""} onValueChange={setIsCitizen} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="citizen-yes" />
                <Label htmlFor="citizen-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="citizen-no" />
                <Label htmlFor="citizen-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-slate-700 dark:text-slate-300">Are you a resident of the area where you want to vote?</Label>
            <RadioGroup value={isResident || ""} onValueChange={setIsResident} required>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="resident-yes" />
                <Label htmlFor="resident-yes" className="font-normal">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="resident-no" />
                <Label htmlFor="resident-no" className="font-normal">No</Label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Check Eligibility</Button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 overflow-hidden"
            >
              <div className={`p-4 rounded-lg flex items-start gap-3 ${result === 'eligible' ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                {result === 'eligible' ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className={`font-semibold ${result === 'eligible' ? 'text-green-800' : 'text-amber-800'}`}>
                    {result === 'eligible' ? 'You appear to be eligible!' : 'You might not be eligible yet.'}
                  </h4>
                  <p className={`text-sm mt-1 ${result === 'eligible' ? 'text-green-700' : 'text-amber-700'}`}>
                    {result === 'eligible' 
                      ? 'Based on your answers, you meet the basic requirements. Make sure to register before the deadline!' 
                      : `To vote, you generally need to be at least ${rules.ageRequired} years old${rules.citizenshipRequired ? ', a citizen,' : ''} and a resident.`}
                  </p>
                  <div className="mt-3 text-xs bg-white/50 dark:bg-slate-800/50 p-2 rounded text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50">
                    <strong>Note:</strong> {rules.notes}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
