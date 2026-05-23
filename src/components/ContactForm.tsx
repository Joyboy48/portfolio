"use client";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Send, Loader2, CheckCircle2, XCircle, User, Mail, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const result = await emailjs.sendForm(
        "service_60hrasr",
        "template_9semgj9",
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (result.text === "OK") {
        setSubmitStatus("success");
        setFormData({ user_name: "", user_email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5 w-full">
      <input type="hidden" name="title" value="Portfolio Contact Form Submission" />

      {/* Name Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <User className="h-3 w-3" /> Your Name
        </label>
        <div className={`relative rounded-xl border transition-all duration-300 ${
          focusedField === "user_name"
            ? "border-primary-sky/50 shadow-md shadow-primary-sky/5"
            : "border-zinc-800 hover:border-zinc-700"
        }`}>
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleChange}
            onFocus={() => setFocusedField("user_name")}
            onBlur={() => setFocusedField(null)}
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 bg-transparent text-zinc-200 font-poppins text-sm placeholder:text-zinc-600 focus:outline-none rounded-xl"
          />
        </div>
      </div>

      {/* Email Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <Mail className="h-3 w-3" /> Email Address
        </label>
        <div className={`relative rounded-xl border transition-all duration-300 ${
          focusedField === "user_email"
            ? "border-primary-sky/50 shadow-md shadow-primary-sky/5"
            : "border-zinc-800 hover:border-zinc-700"
        }`}>
          <input
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            onFocus={() => setFocusedField("user_email")}
            onBlur={() => setFocusedField(null)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 bg-transparent text-zinc-200 font-poppins text-sm placeholder:text-zinc-600 focus:outline-none rounded-xl"
          />
        </div>
      </div>

      {/* Message Field */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider flex items-center gap-1.5">
          <MessageSquare className="h-3 w-3" /> Message
        </label>
        <div className={`relative rounded-xl border transition-all duration-300 ${
          focusedField === "message"
            ? "border-primary-sky/50 shadow-md shadow-primary-sky/5"
            : "border-zinc-800 hover:border-zinc-700"
        }`}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            placeholder="Tell me about your project or just say hi..."
            required
            rows={4}
            className="w-full px-4 py-3 bg-transparent text-zinc-200 font-poppins text-sm placeholder:text-zinc-600 focus:outline-none rounded-xl resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative w-full py-3.5 rounded-xl font-mono text-sm font-bold transition-all duration-300 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5 active:translate-y-0"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              Send Message
            </>
          )}
        </span>
      </button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-sm font-mono animate-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
          Message sent successfully! I&apos;ll get back to you soon.
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-500/5 border border-red-500/20 text-red-400 text-sm font-mono animate-in slide-in-from-bottom-2">
          <XCircle className="h-4 w-4 flex-shrink-0" />
          Failed to send. Please try again or email me directly.
        </div>
      )}
    </form>
  );
};

export default ContactForm;
