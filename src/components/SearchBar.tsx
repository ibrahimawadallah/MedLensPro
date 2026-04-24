"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, useEffect, useRef } from "react";
import { Search, Mic, X, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { pushRecentSearch, getRecentSearches } from "@/lib/storage";

// Type declaration for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: Event) => void;
  onend: (event: Event) => void;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface Props {
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

const POPULAR_SEARCHES = [
  "ibuprofen",
  "acetaminophen",
  "aspirin",
  "amoxicillin",
  "lisinopril",
  "metformin",
  "atorvastatin",
  "omeprazole",
  "panadol",
  "brufen",
  "augmentin",
  "glucophage",
  "lipitor",
  "losartan",
  "paracetamol",
  "amoxil",
];

export function SearchBar({
  defaultValue = "",
  autoFocus = false,
  placeholder,
}: Props) {
  const router = useRouter();
  const t = useTranslations();
  const [value, setValue] = useState(defaultValue);
  const [pending, start] = useTransition();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    setRecentSearches(getRecentSearches());
  }, []);

  useEffect(() => {
    if (value.length > 0) {
      const filtered = POPULAR_SEARCHES.filter((drug) =>
        drug.toLowerCase().includes(value.toLowerCase())
      );
      const historyFiltered = recentSearches.filter((drug) =>
        drug.toLowerCase().includes(value.toLowerCase())
      );
      const combined = Array.from(new Set([...historyFiltered, ...filtered])).slice(0, 8);
      setSuggestions(combined);
      setShowSuggestions(true);
    } else {
      setSuggestions(recentSearches.slice(0, 8));
      setShowSuggestions(false);
    }
  }, [value, recentSearches]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          submit(e);
        }
        break;
      case "Escape":
        e.preventDefault();
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    pushRecentSearch(q);
    setRecentSearches(getRecentSearches());
    setShowSuggestions(false);
    start(() => {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    });
  }

  function selectSuggestion(suggestion: string) {
    setValue(suggestion);
    setShowSuggestions(false);
    pushRecentSearch(suggestion);
    setRecentSearches(getRecentSearches());
    start(() => {
      router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    });
  }

  function startVoiceSearch() {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice search is not supported in this browser");
      return;
    }

    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!recognitionRef.current && SpeechRecognitionClass) {
      recognitionRef.current = new SpeechRecognitionClass();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setValue(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }

  function clearInput() {
    setValue("");
    setShowSuggestions(false);
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={submit} className="w-full" role="search">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm focus-within:ring-2 focus-within:ring-brand-300">
          <Search className="ms-3 h-5 w-5 text-slate-400" aria-hidden />
          <input
            type="search"
            name="q"
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => {
              setValue(e.target.value);
              setSelectedIndex(-1);
            }}
            onFocus={() => setShowSuggestions(true)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? t("home.searchPlaceholder")}
            aria-label={t("home.searchAriaLabel")}
            aria-autocomplete="list"
            aria-controls="search-suggestions"
            aria-activedescendant={selectedIndex >= 0 ? `suggestion-${selectedIndex}` : undefined}
            className="flex-1 bg-transparent py-3 outline-none text-[15px] text-slate-900 dark:text-slate-100"
          />
          {value && (
            <button
              type="button"
              onClick={clearInput}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={startVoiceSearch}
            className={`p-2 rounded-lg ${isListening ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"}`}
            aria-label="Voice search"
          >
            <Mic className="h-4 w-4" />
          </button>
          <button
            type="submit"
            disabled={pending || !value.trim()}
            className="m-1 rounded-xl bg-brand-600 dark:bg-brand-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-brand-700 dark:hover:bg-brand-600"
          >
            {pending ? t("home.searching") : t("common.search")}
          </button>
        </div>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div
          id="search-suggestions"
          className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg max-h-80 overflow-y-auto"
          role="listbox"
        >
          <ul className="py-2" role="presentation">
            {suggestions.map((suggestion, index) => (
              <li key={index} role="presentation">
                <button
                  id={`suggestion-${index}`}
                  onClick={() => selectSuggestion(suggestion)}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                    selectedIndex === index
                      ? "bg-brand-50 dark:bg-brand-900/20 text-brand-700 dark:text-brand-400"
                      : "hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {recentSearches.includes(suggestion) && !POPULAR_SEARCHES.includes(suggestion) ? (
                    <Clock className="h-4 w-4 text-slate-400" aria-hidden />
                  ) : (
                    <Search className="h-4 w-4 text-slate-400" aria-hidden />
                  )}
                  <span className="text-sm">{suggestion}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
