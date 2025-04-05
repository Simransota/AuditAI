"use client";

import React from "react";
import { BentoCard } from "../components/ui/bento-card";

export function AnimatedGradientDemo() {
  return (
    <div className="w-full bg-background h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Total Revenue */}
        <div className="md:col-span-2">
          <BentoCard
            title="Total Revenue Analyzed"
            value="₹86 Cr+"
            subtitle="From sales data across 15 Indian retail and FMCG enterprises"
            colors={["#3B82F6", "#60A5FA", "#93C5FD"]}
            delay={0.2}
          />
        </div>

        {/* New Users */}
        <BentoCard
          title="New Uploads This Week"
          value="1,234 files"
          subtitle="Structured sales data from ERP & POS systems in India"
          colors={["#60A5FA", "#34D399", "#93C5FD"]}
          delay={0.4}
        />

        {/* Conversion Rate */}
        <BentoCard
          title="Anomalies Detected"
          value="18,247"
          subtitle="Discounts >80%, price overrides, fake returns, and mismatches"
          colors={["#F59E0B", "#A78BFA", "#FCD34D"]}
          delay={0.6}
        />

        {/* Active Projects */}
        <div className="md:col-span-2">
          <BentoCard
            title="Enterprises Onboarded"
            value="42+"
            subtitle="Retail, Pharma & FMCG companies from Tier-1 to Tier-3 cities"
            colors={["#3B82F6", "#A78BFA", "#FBCFE8"]}
            delay={0.8}
          />
        </div>

        {/* Customer Satisfaction */}
        <div className="md:col-span-3">
          <BentoCard
            title="Customer Satisfaction"
            value="4.9/5"
            subtitle="Based on 1,000+ internal finance and audit teams using the platform across India"
            colors={["#EC4899", "#F472B6", "#3B82F6"]}
            delay={1}
          />
        </div>

        
        
      </div>
    </div>
  );
}
