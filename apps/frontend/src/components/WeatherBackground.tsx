"use client";

import { useEffect, useState } from "react";

export function WeatherBackground({ code }: { code?: number }) {
  const [gradient, setGradient] = useState(
    "from-slate-900 to-slate-800", // Default dark fallback fallback
  );

  useEffect(() => {
    if (code === undefined) return;

    let newGradient = "from-sky-700 to-indigo-900"; // fallback

    // WMO Weather interpretation codes
    if (code === 0 || code === 1) {
      // Jasno až malá oblačnosť
      newGradient = "from-sky-400 to-blue-600";
    } else if (code === 2 || code === 3) {
      // Polooblačno až zamračené
      newGradient = "from-slate-400 to-slate-600";
    } else if (code >= 45 && code <= 48) {
      // Hmla
      newGradient = "from-gray-400 to-gray-500";
    } else if (code >= 51 && code <= 67) {
      // Mrholenie a dážď
      newGradient = "from-sky-700 to-blue-900";
    } else if (code >= 71 && code <= 77) {
      // Sneženie
      newGradient = "from-blue-200 to-slate-400";
    } else if (code >= 80 && code <= 82) {
      // Prehánky
      newGradient = "from-blue-600 to-indigo-800";
    } else if (code >= 95 && code <= 99) {
      // Búrky
      newGradient = "from-slate-800 to-violet-950";
    }

    setGradient(newGradient);
  }, [code]);

  return (
    <div
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient} transition-colors duration-1000`}
    >
      <div className="absolute inset-0 bg-black/5" />{" "}
      {/* Slight dim for readability */}
    </div>
  );
}
