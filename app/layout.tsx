import "./globals.css";

export const metadata = {
  title: "ABM Micro",
  description:
    "Rebuilding microeconomics from small agent-based models — a web book based on Asad Zaman's ABM Micro course.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans text-gray-900">
        {children}
      </body>
    </html>
  );
}
