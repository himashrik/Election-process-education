"use client";

import { useChat, UIMessage } from '@ai-sdk/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, X, MessageSquare, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useAppContext } from '@/context/AppContext';

/**
 * ElectionAssistant Component
 * 
 * Provides an interactive, Gemini-powered chat interface that adapts to the 
 * current user context (country and explainer level).
 * 
 * Features:
 * - Real-time streaming AI responses
 * - Contextual awareness of app state
 * - Accessible UI with ARIA support
 */
export function ElectionAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { country, level } = useAppContext();
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    body: {
      country,
      level,
    },
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: `Hi! I am your ElectionEd Assistant. I can explain the election process in ${country.toUpperCase()} at a ${level} level. How can I help you today?`,
      },
    ],
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              aria-label="Open Election Assistant"
              className="h-14 w-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center p-0"
            >
              <MessageSquare className="h-6 w-6" aria-hidden="true" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] flex flex-col shadow-2xl rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            <Card className="flex flex-col h-full rounded-none border-0">
              <CardHeader className="bg-blue-600 dark:bg-blue-800 text-white py-4 px-4 flex flex-row items-center justify-between rounded-t-xl">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-full">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold">ElectionEd Assistant</CardTitle>
                    <p className="text-xs text-blue-100 font-medium">Ask me anything about elections</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  aria-label="Close Election Assistant"
                  className="text-white hover:bg-white/20 hover:text-white rounded-full h-8 w-8"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </Button>
              </CardHeader>
              
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
                {messages.map((m) => (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900' : 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800'}`}>
                        {m.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </div>
                      <div className={`py-2 px-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-tr-sm' : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-tl-sm shadow-sm'}`}>
                        <div className="prose prose-sm dark:prose-invert max-w-none break-words
                          prose-p:leading-relaxed prose-p:my-1
                          prose-ul:my-1 prose-ol:my-1
                          prose-li:my-0.5
                          prose-headings:text-base prose-headings:my-2 prose-headings:font-bold
                          prose-strong:font-semibold"
                        >
                          <ReactMarkdown>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="flex gap-3 max-w-[85%]">
                      <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="py-3 px-4 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5">
                        <motion.div className="w-1.5 h-1.5 bg-blue-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                        <motion.div className="w-1.5 h-1.5 bg-blue-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                        <motion.div className="w-1.5 h-1.5 bg-blue-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              
              <CardFooter className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 rounded-b-xl">
                <form onSubmit={handleSubmit} className="flex w-full gap-2 relative">
                  <input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about elections..."
                    className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isLoading || !input.trim()}
                    className="absolute right-1 top-1 h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
