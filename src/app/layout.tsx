import type { Metadata } from "next";
import { Poppins, Rubik } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import { portfolioConfig } from "@/config/portfolio.config";
import Particles from "@/components/animations/Particles";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-poppins",
});
const rubik = Rubik({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: {
    default: portfolioConfig.name,
    template: `%s - ${portfolioConfig.title}`,
  },
  description: portfolioConfig.description,
  icons: {

  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${rubik.variable}`}>
        
        {/* PARTICLES IN BACKGROUND */}
        <div className="fixed inset-0 -z-10">
          <Particles />
        </div>

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main
          className={cn(
            "flex relative break-words h-dvh min-h-screen items-center justify-between pt-14 pb-4 px-40 max-md:p-4 max-sm:pt-20 bg-background/50" // <-- transparent background
          )}
        >
          {children}
        </main>
      </body>
    </html>
  );
}


