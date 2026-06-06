export type Language = "en" | "roman_urdu" | "urdu";

interface LanguageSliderProps {
  selected: Language;
  onChange: (language: Language) => void;
}

const labels: Record<Language, string> = {
  en: "EN",
  roman_urdu: "Roman Urdu",
  urdu: "اردو",
};

const LanguageSlider = ({ selected, onChange }: LanguageSliderProps) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {Object.entries(labels).map(([key, label]) => {
        const lang = key as Language;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(lang)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selected === lang
                ? "bg-white text-slate-900 shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSlider;
