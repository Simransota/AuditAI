"use client";

import React from "react";
import { motion } from "motion/react";
import { 
  Folder, 
  HeartHandshakeIcon, 
  SparklesIcon, 
  Database, 
  Search, 
  LayoutDashboard 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DatabaseWithRestApiProps {
  className?: string;
  circleText?: string;
  badgeTexts?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
  };
  buttonTexts?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const DatabaseWithRestApi = ({
  className,
  circleText,
  badgeTexts,
  buttonTexts,
  title,
  lightColor,
}: DatabaseWithRestApiProps) => {
  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center [--light-color:theme(colors.blue.500)]",
        className
      )}
    >
      <style jsx>{`
        @keyframes moveLight1 {
          from { transform: translate(31px, 10px); }
          to { transform: translate(100px, 45px); }
        }
        @keyframes moveLight2 {
          from { transform: translate(77px, 10px); }
          to { transform: translate(100px, 40px); }
        }
        @keyframes moveLight3 {
          from { transform: translate(124px, 10px); }
          to { transform: translate(100px, 40px); }
        }
        @keyframes moveLight4 {
          from { transform: translate(170px, 10px); }
          to { transform: translate(100px, 45px); }
        }
        :global(.db-light-1) {
          animation: moveLight1 2s infinite alternate ease-in-out;
        }
        :global(.db-light-2) {
          animation: moveLight2 2s infinite alternate ease-in-out;
          animation-delay: 0.5s;
        }
        :global(.db-light-3) {
          animation: moveLight3 2s infinite alternate ease-in-out;
          animation-delay: 1s;
        }
        :global(.db-light-4) {
          animation: moveLight4 2s infinite alternate ease-in-out;
          animation-delay: 1.5s;
        }
      `}</style>
      {/* SVG Paths  */}
      <svg
        className="h-full sm:w-full text-muted"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke="currentColor"
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
        >
          <path d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10" />
          <path d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10" />
          <path d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10" />
          <path d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10" />
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        {/* Blue Lights */}
        <g mask="url(#db-mask-1)">
          <circle
            className="database db-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-2)">
          <circle
            className="database db-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-3)">
          <circle
            className="database db-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        <g mask="url(#db-mask-4)">
          <circle
            className="database db-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#db-blue-grad)"
          />
        </g>
        {/* Buttons */}
        <g stroke="currentColor" fill="none" strokeWidth="0.4">
          {/* Database Button */}
          <g>
            <rect
              fill="#f4f4f5"
              x="14"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <DatabaseIconSVG x="18" y="7.5"></DatabaseIconSVG>
            <text
              x="28"
              y="12"
              fill="#18181B"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.first || "DB"}
            </text>
          </g>
          {/* RAG Button */}
          <g>
            <rect
              fill="#f4f4f5"
              x="60"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <RAGIconSVG x="64" y="7.5"></RAGIconSVG>
            <text
              x="74"
              y="12"
              fill="#18181B"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.second || "RAG"}
            </text>
          </g>
          {/* API Button */}
          <g>
            <rect
              fill="#f4f4f5"
              x="108"
              y="5"
              width="34"
              height="10"
              rx="5"
            ></rect>
            <APIIconSVG x="112" y="7.5"></APIIconSVG>
            <text
              x="122"
              y="12"
              fill="#18181B"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.third || "API"}
            </text>
          </g>
          {/* Frontend Button */}
          <g>
            <rect
              fill="#f4f4f5"
              x="150"
              y="5"
              width="40"
              height="10"
              rx="5"
            ></rect>
            <FrontendIconSVG x="154" y="7.5"></FrontendIconSVG>
            <text
              x="165"
              y="12"
              fill="#18181B"
              stroke="none"
              fontSize="5"
              fontWeight="500"
            >
              {badgeTexts?.fourth || "UI"}
            </text>
          </g>
        </g>
        <defs>
          {/* 1 -  user list */}
          <mask id="db-mask-1">
            <path
              d="M 31 10 v 15 q 0 5 5 5 h 59 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 2 - task list */}
          <mask id="db-mask-2">
            <path
              d="M 77 10 v 10 q 0 5 5 5 h 13 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 3 - backlogs */}
          <mask id="db-mask-3">
            <path
              d="M 124 10 v 10 q 0 5 -5 5 h -14 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* 4 - misc */}
          <mask id="db-mask-4">
            <path
              d="M 170 10 v 15 q 0 5 -5 5 h -60 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          {/* Blue Grad */}
          <radialGradient id="db-blue-grad" fx="1">
            <stop offset="0%" stopColor={lightColor || "#00A6F5"} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow */}
        <div className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg bg-accent/30" />
        {/* box title */}
        <div className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border bg-white px-2 py-1 sm:-top-4 sm:py-1.5">
          <SparklesIcon className="size-3" />
          <span className="ml-2 text-[10px]">
            {title ? title : "Database, RAG & Frontend Integration"}
          </span>
        </div>
        {/* box outter circle */}
        <div className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full border-t bg-white font-semibold text-xs">
          <Database className="size-4" />
          <span className="text-[10px]">{circleText ? circleText : "DB"}</span>
        </div>
        {/* box content */}
        <div className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border bg-white shadow-md">
          {/* Badges */}
          <div className="absolute bottom-8 left-12 z-10 h-7 rounded-full bg-white px-3 text-xs border flex items-center gap-2 ">
            <Search className="size-4" />
            <span>{buttonTexts?.first || "RAG System"}</span>
          </div>
          <div className="absolute right-16 z-10 hidden h-7 rounded-full bg-white px-3 text-xs sm:flex border items-center gap-2">
            <LayoutDashboard className="size-4" />
            <span>{buttonTexts?.second || "UI Components"}</span>
          </div>
          {/* Circles */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full border-t bg-accent/5"
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
};

export default DatabaseWithRestApi;

// Custom SVG Icons for the buttons
const DatabaseIconSVG = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
};

// RAG Icon (combining Search and Database elements)
const RAGIconSVG = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Database element */}
      <ellipse cx="9" cy="6" rx="6" ry="2" />
      <path d="M3 6v6a6 2 0 0 0 12 0V6" />
      
      {/* Search/Magnifying glass element */}
      <circle cx="17" cy="15" r="3" />
      <path d="M21 19l-2-2" />
    </svg>
  );
};

// API Icon (representing data exchange)
const APIIconSVG = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3" />
      <path d="M17 7h3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-3" />
      <path d="M8 7h8" />
      <path d="M8 17h8" />
      <path d="M11 12h2" />
    </svg>
  );
};

// Frontend Icon (layout dashboard style)
const FrontendIconSVG = ({ x = "0", y = "0" }: { x: string; y: string }) => {
  return (
    <svg
      x={x}
      y={y}
      xmlns="http://www.w3.org/2000/svg"
      width="5"
      height="5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#18181B"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
};