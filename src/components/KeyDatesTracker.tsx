import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KeyDate } from "@/types/election";
import { CalendarDays } from "lucide-react";

interface Props {
  dates: KeyDate[];
}

export function KeyDatesTracker({ dates }: Props) {
  if (!dates || dates.length === 0) return null;

  return (
    <Card className="shadow-sm border-slate-200 dark:border-slate-800">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 pb-4">
        <CardTitle className="text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-blue-600" />
          Key Election Dates
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {dates.map((date, idx) => (
            <div key={idx} className="flex gap-4 items-start relative">
              {idx !== dates.length - 1 && (
                <div className="absolute left-3 top-8 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -mb-6" />
              )}
              <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-blue-500 flex-shrink-0 mt-0.5 z-10" />
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-100">{date.title}</h4>
                <p className="text-sm font-medium text-blue-600 my-0.5">{date.date}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{date.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
