"use client";
import React, { useState } from "react";
import ContactForm from "@/components/ContactForm";
import FramerWrapper from "@/components/animation/FramerWrapper";
import Heading from "@/components/Heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Copy,
  Check,
  Send,
} from "lucide-react";
import Link from "next/link";
import { portfolioConfig } from "@/config/portfolio.config";

const socials = [
  { name: "LinkedIn", icon: Linkedin, href: portfolioConfig.socialLinks.linkedin, color: "text-sky-400 hover:border-sky-900/40" },
  { name: "GitHub", icon: Github, href: portfolioConfig.socialLinks.github, color: "text-zinc-300 hover:border-zinc-600" },
  { name: "Twitter", icon: Twitter, href: portfolioConfig.socialLinks.twitter, color: "text-sky-400 hover:border-sky-900/40" },
];

const ContactPage = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioConfig.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="h-full w-full relative flex flex-col items-start gap-6 overflow-y-auto no-scrollbar pb-8">
      <Badge variant="secondary" className="gap-1.5 py-1">
        <Send className="h-4 w-4" />
        Contact
      </Badge>

      <div className="flex flex-col gap-1">
        <Heading>Get In Touch</Heading>
        <p className="text-zinc-500 text-sm font-poppins">
          Have a project in mind, a question, or just want to say hi? Drop me a message.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left: Contact Info Cards */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Email Card */}
          <FramerWrapper y={20} delay={0.1}>
            <Card className="bg-zinc-900/10 border-zinc-800/60 hover:border-zinc-700 transition-all group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-sky-500/5 border border-sky-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Mail className="h-5 w-5 text-sky-400" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Email</p>
                  <p className="text-sm font-mono text-zinc-300 truncate">{portfolioConfig.email}</p>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg hover:bg-zinc-800 transition-colors flex-shrink-0"
                  title="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <Copy className="h-4 w-4 text-zinc-600 hover:text-zinc-400" />
                  )}
                </button>
              </CardContent>
            </Card>
          </FramerWrapper>

          {/* Phone Card */}
          <FramerWrapper y={20} delay={0.15}>
            <Card className="bg-zinc-900/10 border-zinc-800/60 hover:border-zinc-700 transition-all group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/5 border border-emerald-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <Phone className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Phone</p>
                  <p className="text-sm font-mono text-zinc-300">{portfolioConfig.phone}</p>
                </div>
              </CardContent>
            </Card>
          </FramerWrapper>

          {/* Location Card */}
          <FramerWrapper y={20} delay={0.2}>
            <Card className="bg-zinc-900/10 border-zinc-800/60 hover:border-zinc-700 transition-all group">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-purple-500/5 border border-purple-900/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MapPin className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-grow">
                  <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-mono text-zinc-300">{portfolioConfig.location}</p>
                </div>
              </CardContent>
            </Card>
          </FramerWrapper>

          {/* Social Links */}
          <FramerWrapper y={20} delay={0.25}>
            <div className="flex flex-col gap-2">
              <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider px-1">Connect With Me</p>
              <div className="flex gap-2">
                {socials.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800/60 ${social.color} bg-zinc-900/20 hover:bg-zinc-900/40 transition-all hover:-translate-y-0.5 group`}
                  >
                    <social.icon className="h-4 w-4" />
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors hidden sm:inline">{social.name}</span>
                    <ExternalLink className="h-3 w-3 text-zinc-700 hidden sm:inline" />
                  </Link>
                ))}
              </div>
            </div>
          </FramerWrapper>
        </div>

        {/* Right: Contact Form */}
        <FramerWrapper y={0} x={50} delay={0.15} className="lg:col-span-3">
          <Card className="bg-zinc-900/10 border-zinc-800/60 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-sky/40 to-transparent" />
            <CardContent className="p-6">
              <div className="mb-5">
                <h3 className="text-lg font-rubik font-bold text-primary">Send a Message</h3>
                <p className="text-zinc-500 text-xs font-mono mt-1">I typically respond within 24 hours</p>
              </div>
              <ContactForm />
            </CardContent>
          </Card>
        </FramerWrapper>
      </div>
    </div>
  );
};

export default ContactPage;
