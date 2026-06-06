import { useState } from "react";
import LanguageSlider, { type Language } from "./LanguageSlider";
import SearchBar from "./SearchBar";
import type { Poi } from "../types/poi";

const headings: Record<Language, { title: string; subtitle: string }> = {
  en: {
    title: "Discover Every Corner of Your City",
    subtitle: "Open-source POI search — fast, accurate, and built for Pakistan.",
  },
  roman_urdu: {
    title: "Apne Shehar Ka Kona Kona Dhoondein",
    subtitle: "Open-source jagah talash — tez, durust, aur Pakistan ke liye.",
  },
  urdu: {
    title: "اپنے شہر کا کونا کونا دریافت کریں",
    subtitle: "اوپن سورس مقام تلاش — تیز، درست، اور پاکستان کے لیے۔",
  },
};

const HeroSection = ({ onSelect }: { onSelect: (poi: Poi) => void }) => {
  const [language, setLanguage] = useState<Language>("en");
  const isUrdu = language === "urdu";

  const text = headings[language];

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 z-0">
        {/* Replace this div's bg with your actual image: style={{ backgroundImage: "url('/your-image.jpg')" }} */}
        <div
          className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Placeholder text for dev — remove when you add the real image */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <span className="text-white text-2xl font-light tracking-widest uppercase">
              Add your background image here
            </span>
          </div>
        </div>

        {/* Overlay: darkens bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Subtle grid overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center gap-8 py-20">

 

       

        {/* Heading */}
        <div
          className={`text-center transition-all duration-500 ${isUrdu ? "font-[Noto Nastaliq Urdu,serif]" : ""}`}
          dir={isUrdu ? "rtl" : "ltr"}
        >
          <h1
            className={`
              text-white font-bold leading-tight tracking-tight mb-3
              text-3xl sm:text-4xl md:text-5xl
              transition-all duration-500
            `}
            style={{
              fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : undefined,
              lineHeight: isUrdu ? "1.8" : undefined,
            }}
          >
            {text.title}
          </h1>
          <p
            className="text-white/70 text-base sm:text-lg font-light max-w-xl mx-auto"
            style={{ fontFamily: isUrdu ? "'Noto Nastaliq Urdu', serif" : undefined }}
          >
            {text.subtitle}
          </p>
        </div>

         {/* Language Slider */}
        <LanguageSlider selected={language} onChange={setLanguage} />

        {/* Search Bar */}
        <div className="w-full">
          <SearchBar language={language} onSelect={onSelect} />
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 sm:gap-10 mt-2">
          {[
            { value: "2M+", label: language === "urdu" ? "مقامات" : language === "roman_urdu" ? "Muqamaat" : "POIs indexed" },
            { value: "<50ms", label: language === "urdu" ? "تاخیر" : language === "roman_urdu" ? "Latency" : "Avg. latency" },
            { value: "Open", label: language === "urdu" ? "سورس" : language === "roman_urdu" ? "Source" : "Source" },
          ].map((stat) => (
            <div key={stat.value} className="text-center">
              <div className="text-white font-bold text-xl sm:text-2xl">{stat.value}</div>
              <div
                className="text-gray-100 text-xs sm:text-sm mt-0.5"
                style={{ fontFamily: language === "urdu" ? "'Noto Nastaliq Urdu', serif" : undefined }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/10 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
