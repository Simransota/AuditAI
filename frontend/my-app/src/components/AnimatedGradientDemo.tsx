"use client";

import React from "react";
import { BentoCard } from "../components/ui/bento-card";

export function AnimatedGradientDemo() {
  return (
    <div className="w-full bg-background h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <div className="md:col-span-2">
          <BentoCard
            title="Total Revenue"
            value="$1,234,567"
            subtitle="15% increase from last month"
            colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
            delay={0.2}
          />
        </div>
        <BentoCard
          title="New Users"
          value={1234}
          subtitle="Daily signups"
          colors={["#60A5FA", "#34D399", "#93C5FD"]}
          delay={0.4}
        />
        <BentoCard
          title="Conversion Rate"
          value="3.45%"
          subtitle="0.5% increase from last week"
          colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
          delay={0.6}
        />
        <div className="md:col-span-2">
          <BentoCard
            title="Active Projects"
            value={42}
            subtitle="8 completed this month"
            colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
            delay={0.8}
          />
        </div>
        <div className="md:col-span-3">
          <BentoCard
            title="Customer Satisfaction"
            value="4.8/5"
            subtitle="Based on 1,000+ reviews from verified customers across all product categories"
            colors={["#EC4899", "#F472B6", "#3B82F6"]}
            delay={1}
          />
        </div>
      </div>
    </div>
  );
}