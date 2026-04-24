"use client";

import { useState } from "react";
import { MessageCircle, X, Send, ThumbsUp, ThumbsDown } from "lucide-react";

interface FeedbackWidgetProps {
  position?: "bottom-right" | "bottom-left";
}

export function FeedbackWidget({ position = "bottom-right" }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!feedback.trim()) return;

    // For demo purposes, simulate API call
    // In production, integrate with feedback service (Typeform, Formspree, etc.)
    console.log("Feedback submitted:", { feedback, rating });
    setSent(true);
    setTimeout(() => {
      setIsOpen(false);
      setSent(false);
      setFeedback("");
      setRating(null);
    }, 2000);
  }

  if (sent) {
    return (
      <div className={`fixed ${positionClasses[position]} z-50`}>
        <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" />
          <span className="text-sm font-medium">Thanks for your feedback!</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-600 dark:bg-brand-500 text-white p-3 rounded-full shadow-lg hover:bg-brand-700 dark:hover:bg-brand-600 transition-all"
          aria-label="Give feedback"
        >
          <MessageCircle className="h-5 w-5" />
        </button>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              Share your feedback
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                How was your experience?
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRating(rating === 1 ? null : 1)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    rating === 1
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                  aria-label="Positive"
                >
                  <ThumbsUp className="h-5 w-5 mx-auto text-slate-600 dark:text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={() => setRating(rating === 0 ? null : 0)}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    rating === 0
                      ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                      : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                  }`}
                  aria-label="Negative"
                >
                  <ThumbsDown className="h-5 w-5 mx-auto text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                Your feedback
              </label>
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                rows={3}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-400 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-600 dark:bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 dark:hover:bg-brand-600 transition-all"
            >
              <Send className="h-4 w-4" />
              Send Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
