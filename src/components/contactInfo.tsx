"use client";
import React from "react";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";
import { useState } from "react";

const ContactInfo = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2.5 mt-2 px-4">
      <div
        onClick={copyEmail}
        className="group flex items-center gap-2.5 cursor-pointer hover:text-sky-400 transition-colors"
      >
        <div className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center group-hover:border-sky-900/40 transition-colors">
          <Mail className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 transition-colors" />
        </div>
        <span className="text-sm font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
          {portfolioConfig.email}
        </span>
        {copiedEmail ? (
          <Check className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <Copy className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </div>

      <div className="group flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-zinc-900/60 border border-zinc-800 flex items-center justify-center">
          <Phone className="w-3.5 h-3.5 text-zinc-500" />
        </div>
        <span className="text-sm font-mono text-zinc-400">
          {portfolioConfig.phone}
        </span>
      </div>
    </div>
  );
};

export default ContactInfo;
