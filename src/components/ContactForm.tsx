"use client";
import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // ✅ keeps consistent with user_name, user_email, message
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await emailjs.sendForm(
        "service_60hrasr", // your service ID
        "template_9semgj9", // your template ID
        form.current!,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY 
      );

      if (result.text === "OK") {
        setSubmitStatus("success");
        setFormData({ user_name: "", user_email: "", message: "" }); // ✅ reset correctly
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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
      <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input type="hidden" name="title" value="Portfolio Contact Form Submission" />

        <div className="mb-2">
          <h2 className="text-2xl font-bold mb-1 text-zinc-900 dark:text-white">
            Contact Me
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            Feel free to reach out for any questions or opportunities!
          </p>
        </div>

        <input
          type="text"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
        />

        <input
          type="email"
          name="user_email"
          value={formData.user_email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-white min-h-[80px] resize-none"
        ></textarea>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>

        {submitStatus === "success" && (
          <div className="mt-2 p-2 rounded bg-green-100 text-green-800 border border-green-300 text-center">
            ✅ Thank you! Your message has been sent successfully.
          </div>
        )}

        {submitStatus === "error" && (
          <div className="mt-2 p-2 rounded bg-red-100 text-red-800 border border-red-300 text-center">
            ❌ Failed to send message. Please try again later.
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
