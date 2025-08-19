import { Mail, Phone } from "lucide-react";
import { portfolioConfig } from "@/config/portfolio.config";

const ContactInfo = () => {
  return (
    <div className="flex flex-col gap-2 mt-4 text-white">
      <div className="flex items-center gap-2">
        <Mail className="w-5 h-5" />
        <span>{portfolioConfig.email}</span>
      </div>

      <div className="flex items-center gap-2">
        <Phone className="w-5 h-5" />
        <span>{portfolioConfig.phone}</span>
      </div>
    </div>
  );
};

export default ContactInfo;
