"use client";

import { motion } from "framer-motion";
import {
  CloudRain,
  Sun,
  Sunrise,
  Sunset,
  ThermometerSun,
  Wind,
} from "lucide-react";

import { WeatherResponse } from "@/types/weather";

import { WeatherBackground } from "./WeatherBackground";

export function WeatherBento({ data }: { data: WeatherResponse }) {
  const containerAnimationVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <>
      <WeatherBackground code={data.weatherCode} />
      <motion.div
        variants={containerAnimationVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6"
      >
        {/* MAIN CARD - AI STORY */}
        <motion.div
          variants={itemVariants}
          className="group relative overflow-hidden rounded-[2.5rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl transition-all hover:bg-white/15 sm:p-8 md:col-span-full md:p-10"
        >
          <div className="pointer-events-none absolute right-0 top-0 p-8 text-white opacity-[0.03]">
            <Sun size={180} strokeWidth={1} />
          </div>

          <div className="relative z-10">
            <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-white md:text-5xl">
              {data.headline}
            </h2>
            <p className="mb-8 max-w-2xl border-b border-white/20 pb-6 text-lg font-medium leading-relaxed text-slate-200">
              {data.subtitle}
            </p>

            <div className="space-y-6">
              <div className="flex flex-col gap-2">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                  <Sunrise className="h-5 w-5 text-amber-400" />
                  Dopoludnia
                </h3>
                <p className="text-base leading-relaxed text-slate-200">
                  {data.sections.morning}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                  <Sunset className="h-5 w-5 text-orange-400" />
                  Popoludní a Večer
                </h3>
                <p className="text-base leading-relaxed text-slate-200">
                  {data.sections.afternoon}
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-5 italic text-slate-200 shadow-sm">
                <p>💡 {data.sections.tip}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* DATA CARDS (Open-Meteo) */}

        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-colors hover:bg-white/10"
        >
          <div className="flex items-start justify-between">
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/20 p-3">
              <ThermometerSun className="h-6 w-6 text-rose-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
              Teploty
            </span>
          </div>
          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">
                {data.tempMax !== undefined ? Math.round(data.tempMax) : "--"}°
              </span>
              <span className="pb-1 text-xl font-medium text-white/50">C</span>
            </div>
            <p className="mt-2 text-sm font-medium text-white/50">
              Minimálna teplota{" "}
              {data.tempMin !== undefined ? Math.round(data.tempMin) : "--"}°C
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-colors hover:bg-white/10"
        >
          <div className="flex items-start justify-between">
            <div className="rounded-2xl border border-sky-500/30 bg-sky-500/20 p-3">
              <Wind className="h-6 w-6 text-sky-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-400">
              Vietor
            </span>
          </div>
          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">
                {data.windSpeed !== undefined
                  ? Math.round(data.windSpeed)
                  : "--"}
              </span>
              <span className="pb-1 text-lg font-medium text-white/50">
                km/h
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-white/50">
              Maximálne nárazy vetra
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="col-span-1 flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl transition-colors hover:bg-white/10 md:col-span-3 lg:col-span-1"
        >
          <div className="flex items-start justify-between">
            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/20 p-3">
              <CloudRain className="h-6 w-6 text-blue-400" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
              Zrážky
            </span>
          </div>
          <div className="mt-6 flex flex-col justify-center">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-white">
                {data.precipitation !== undefined ? data.precipitation : "--"}
              </span>
              <span className="pb-1 text-lg font-medium text-white/50">mm</span>
            </div>
            <p className="mt-3 line-clamp-2 text-sm font-medium text-white/50">
              Denný úhrn zrážok, dáždnikov sa nepusti.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
