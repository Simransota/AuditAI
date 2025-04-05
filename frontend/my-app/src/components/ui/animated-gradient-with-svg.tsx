"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type BlurStrength = "none" | "light" | "medium" | "strong";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: BlurStrength;
}

const getBlurValue = (strength: BlurStrength): string => {
  switch (strength) {
    case "none":
      return "blur-none";
    case "light":
      return "blur-sm";
    case "medium":
      return "blur-md";
    case "strong":
      return "blur-lg";
    default:
      return "blur-md";
  }
};

export const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 0.05,
  blur = "none",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updatePosition = () => {
      if (!containerRef.current) return;
      const { width, height } = containerRef.current.getBoundingClientRect();
      
      const svgEl = containerRef.current.querySelector("svg");
      if (svgEl) {
        svgEl.setAttribute("width", width.toString());
        svgEl.setAttribute("height", height.toString());
        
        const circles = svgEl.querySelectorAll("circle");
        circles.forEach(circle => {
          const cx = parseFloat(circle.getAttribute("cx") || "0");
          const cy = parseFloat(circle.getAttribute("cy") || "0");
          
          circle.setAttribute("cx", ((cx + speed) % (width + 100)).toString());
          circle.setAttribute("cy", ((cy + speed / 2) % (height + 100)).toString());
        });
      }
      
      requestAnimationFrame(updatePosition);
    };
    
    requestAnimationFrame(updatePosition);
  }, [speed]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden opacity-60"
    >
      <svg width="100%" height="100%">
        <defs>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation={blur === "none" ? "0" : "40"} />
          </filter>
        </defs>
        {colors.map((color, index) => (
          <circle
            key={index}
            cx={100 + index * 150}
            cy={100 + index * 80}
            r={100 + index * 50}
            fill={color}
            className={getBlurValue(blur)}
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  );
};