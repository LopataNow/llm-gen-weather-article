"use client";

import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

export function WeatherBackground({ code }: { code?: number }) {
  const [gradient, setGradient] = useState("from-slate-900 to-slate-800");
  const [IconComponent, setIconComponent] = useState<React.ElementType>(Cloud);
  const [iconColor, setIconColor] = useState("text-slate-500");

  useEffect(() => {
    if (code === undefined) return;

    let newGradient = "from-sky-900 via-indigo-900 to-slate-900";
    let newIcon = Cloud;
    let newIconColor = "text-slate-500";

    // WMO Weather interpretation codes
    if (code === 0 || code === 1) {
      newGradient = "from-blue-600 via-blue-800 to-indigo-950";
      newIcon = Sun;
      newIconColor = "text-yellow-400";
    } else if (code === 2 || code === 3) {
      newGradient = "from-slate-700 via-slate-800 to-slate-900";
      newIcon = Cloud;
      newIconColor = "text-slate-400";
    } else if (code >= 45 && code <= 48) {
      newGradient = "from-gray-700 via-slate-800 to-slate-900";
      newIcon = CloudFog;
      newIconColor = "text-gray-400";
    } else if (code >= 51 && code <= 67) {
      newGradient = "from-slate-800 via-cyan-900 to-blue-950";
      newIcon = CloudRain;
      newIconColor = "text-cyan-500";
    } else if (code >= 71 && code <= 77) {
      newGradient = "from-slate-700 via-indigo-900 to-slate-900";
      newIcon = CloudSnow;
      newIconColor = "text-indigo-300";
    } else if (code >= 80 && code <= 82) {
      newGradient = "from-blue-900 via-indigo-900 to-slate-950";
      newIcon = CloudRain;
      newIconColor = "text-blue-400";
    } else if (code >= 95 && code <= 99) {
      newGradient = "from-slate-900 via-violet-950 to-indigo-950";
      newIcon = CloudLightning;
      newIconColor = "text-violet-500";
    }

    setGradient(newGradient);
    setIconComponent(() => newIcon);
    setIconColor(newIconColor);
  }, [code]);

  return (
    <div
      className={`fixed inset-0 -z-10 bg-gradient-to-br ${gradient} overflow-hidden transition-colors duration-1000`}
    >
      {/* Decorative dynamic big icon */}
      <div
        className={`absolute -right-20 -top-20 opacity-20 blur-xl transition-all duration-1000 ${iconColor}`}
      >
        {IconComponent && <IconComponent size={600} strokeWidth={1} />}
      </div>

      <div
        className={`absolute -bottom-40 -left-40 opacity-10 blur-2xl transition-all duration-1000 ${iconColor}`}
      >
        {IconComponent && <IconComponent size={800} strokeWidth={1.5} />}
      </div>

      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
    </div>
  );
}
