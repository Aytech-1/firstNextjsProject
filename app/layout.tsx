import 'animate.css';
import { Inter, Poppins } from "next/font/google";
import "@/styles/globals.css";
import ToastProvider from "@/components/ui/toast-provider";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const titleFont = Poppins({
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
  variable: "--font-title",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.className} ${titleFont.variable} h-full antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
