import { useState, useEffect, useRef, useCallback, type ChangeEvent } from "react";
import type { Language } from "./LanguageSlider";
import type { Poi } from "../types/poi";

interface SearchBarProps {
  language: Language;
  onSelect: (poi: Poi) => void;
}

const placeholders: Record<Language, string> = {
  en: "Search for a place, address or POI...",
  roman_urdu: "Jagah, pata ya POI dhundein...",
  urdu: "جگہ، پتہ یا مقام تلاش کریں...",
};

const SearchBar = ({ language, onSelect }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Poi[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isUrdu = language === "urdu";

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }, []);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const base = "https://bykeapro-backend-git-master-awarisghaziwork-7951s-projects.vercel.app/";
        const url = `${base}api/search?q=${encodeURIComponent(debouncedQuery)}`;
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const raw: any = await res.json();
        console.log("SearchBar backend response:", raw);

        const data: Poi[] = Array.isArray(raw)
          ? raw.map((r) => ({
              id: r.id ?? r.place_id ?? JSON.stringify(r),
              name_clean: r.name_clean ?? r.display_name ?? r.name ?? "Unknown place",
              category: r.category ?? r.type ?? r.class ?? "address",
              latitude: Number(r.latitude ?? r.lat ?? 0),
              longitude: Number(r.longitude ?? r.lon ?? 0),
              alternative_names: r.alternative_names ?? r.display_name ?? "",
            }))
          : [];

        setSuggestions(data);
      } catch (error) {
        if ((error as any).name !== "AbortError") {
          console.error("Error fetching search suggestions:", error);
          setSuggestions([]);
        }
      } finally {
        setIsSearching(false);
      }
    };

    fetchSuggestions();
    return () => controller.abort();
  }, [debouncedQuery]);

  useEffect(() => {
    setQuery("");
    setDebouncedQuery("");
    setSuggestions([]);
  }, [language]);

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleSelect = (poi: Poi) => {
    setQuery(poi.name_clean);
    setSuggestions([]);
    setShowSuggestions(false);
    onSelect(poi);
  };

  const quickTags = language === "urdu"
    ? ["ہسپتال", "ریستوراں", "بینک", "پارک"]
    : ["Hospital", "Restaurant", "Bank", "Park"];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center bg-white rounded-2xl shadow-xl transition-all duration-300">
        <div className="absolute left-4 flex items-center text-slate-400 pointer-events-none">
          {isSearching ? (
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeLinecap="round" opacity="0.25" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholders[language]}
          dir={isUrdu ? "rtl" : "ltr"}
          className={`w-full py-4 text-[15px] bg-transparent outline-none text-slate-800 placeholder:text-slate-400 transition-all duration-200 ${
            isUrdu ? "pr-14 pl-12 text-right font-[Noto Nastaliq Urdu,serif]" : "pl-12 pr-12"
          }`}
          style={{
            fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : undefined,
            lineHeight: isUrdu ? "2" : undefined,
          }}
        />

        {query.length > 0 ? (
          <button
            onClick={handleClear}
            className={`absolute ${isUrdu ? "left-4" : "right-4"} w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors`}
          >
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <div className={`absolute ${isUrdu ? "left-2" : "right-2"} px-4 py-2 rounded-xl bg-[#2b9a5eba] text-white text-sm font-medium`}> 
            {isUrdu ? "تلاش" : language === "roman_urdu" ? "Talash" : "Search"}
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="mt-3 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <ul className="divide-y divide-slate-100">
            {suggestions.map((poi) => (
              <li
                key={poi.id}
                onMouseDown={() => handleSelect(poi)}
                className="cursor-pointer px-4 py-4 transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{poi.name_clean}</p>
                    <p className="text-xs text-slate-500 mt-1">{poi.category}</p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">Go</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={`mt-3 flex flex-wrap gap-2 ${isUrdu ? "justify-end flex-row-reverse" : "justify-start"}`}>
        {quickTags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setQuery(tag);
              setDebouncedQuery(tag);
              setShowSuggestions(true);
            }}
            className="px-3 py-1 bg-slate-100 text-slate-800 rounded-full transition hover:bg-slate-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
