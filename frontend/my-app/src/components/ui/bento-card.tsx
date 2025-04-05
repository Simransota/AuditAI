"use client";

import React from "react";
import { AnimatedGradient } from "./animated-gradient-with-svg";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
}

export function BentoCard({
  title,
  value,
  subtitle,
  colors,
  delay,
}: BentoCardProps) {
  return (
    <div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50"
      style={{
        opacity: 1,
        transition: `opacity 0.5s ease ${delay}s`
      }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <div
        className="relative z-10 p-3 sm:p-5 md:p-8 text-foreground backdrop-blur-sm"
        style={{
          animation: `fadeIn 0.5s ease ${delay + 0.3}s forwards`
        }}
      >
        <h3 
          className="text-sm sm:text-base md:text-lg text-foreground" 
          style={{ animation: `fadeIn 0.5s ease ${delay + 0.4}s forwards` }}
        >
          {title}
        </h3>
        <p
          className="text-2xl sm:text-4xl md:text-5xl font-medium mb-4 text-foreground"
          style={{ animation: `fadeIn 0.5s ease ${delay + 0.5}s forwards` }}
        >
          {value}
        </p>
        {subtitle && (
          <p 
            className="text-sm text-foreground/80" 
            style={{ animation: `fadeIn 0.5s ease ${delay + 0.6}s forwards` }}
          >
            {subtitle}
          </p>
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}