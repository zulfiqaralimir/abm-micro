import { Inter, Source_Serif_4 } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata = {
  title: "ABM Micro",
  description:
    "Rebuilding microeconomics from small agent-based models — a web book based on Asad Zaman's ABM Micro course.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink">
        <SiteNav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
