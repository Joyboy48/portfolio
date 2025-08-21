import { Mail, Phone } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-2 mt-4 text-white">
      {/* Email */}
      <a
        href={`mailto:${portfolioConfig.email}`}
        className="flex items-center gap-2 hover:text-blue-400 transition"
      >
        <Mail className="w-5 h-5" />
        <span>{portfolioConfig.email}</span>
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${portfolioConfig.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 hover:text-green-400 transition"
      >
        <Phone className="w-5 h-5" />
        <span>{portfolioConfig.phone}</span>
      </a>
    </div>
  );
};

export default ContactInfo;
