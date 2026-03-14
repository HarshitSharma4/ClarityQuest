import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "ClarityQuest — Personal Communication Coach",
  description: "Train your English with AI-powered pronunciation, fluency, and non-verbal coaching. Asynchronous practice with detailed feedback for Indian learners.",
  keywords: ["English training", "pronunciation", "communication", "interview prep", "fluency"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <div id="main-content">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
