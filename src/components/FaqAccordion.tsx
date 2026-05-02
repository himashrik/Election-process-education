import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQ } from "@/types/election";

interface Props {
  faqs: FAQ[];
}

export function FaqAccordion({ faqs }: Props) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">Frequently Asked Questions</h3>
      <Accordion className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-slate-200 dark:border-slate-800">
            <AccordionTrigger className="text-left font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
