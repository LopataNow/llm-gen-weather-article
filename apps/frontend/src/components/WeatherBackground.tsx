"use client";

import { useEffect, useState } from "react";

export function WeatherBackground({ code }: { code?: number }) {
  const [gradient, setGradient] = useState(
    "from-slate-900 to-slate-800", // Default dark fallback fallback
  );

  useEffect(() => {
    if (code === undefined) return;

    let newGradient = "from-slate-900 to-slate-800";

    // WMO Weather interpretation codes
    if (code === 0 || code === 1) {
      // Jasno až malá oblačnosť
      newGradient = "from-blue-600 to-cyan-500";
    } else if (code === 2 || code === 3) {
      // Polooblačno až zamračené
      newGradient = "from-slate-600 to-slate-500";
    } else if (code >= 45 && code <= 48) {
      // Hmla
      newGradient = "from-slate-700 to-slate-400";
    } else if (code >= 51 && code <= 67) {
      // Mrholenie a dážď
      newGradient = "from-slate-800 to-blue-900";
    } else if (code >= 71 && code <= 77) {
      // Sneženie
      newGradient = "from-slate-300 to-slate-500";
    } else if (code >= 80 && code <= 82) {
      // Prehánky
      newGradient = "from-blue-900 to-indigo-900";
    } else if (code >= 95 && code <= 99) {
      // Búrky
      newGradient = "from-slate-900 to-indigo-950";
    }

    setGradient(newGradient);
  }, [code]);

  return (
    <div
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient} transition-colors duration-1000`}
    >
      <div className="absolute inset-0 bg-black/20" />{" "}
      {/* Slight dim for readability */}
    </div>
  );
}
