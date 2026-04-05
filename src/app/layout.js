import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QR Studio — Beautiful QR Code Generator",
  description:
    "Generate stunning, customizable QR codes for URLs, text, contacts, and WiFi. Free, instant, and fully private — no data leaves your browser.",
  keywords: ["qr code", "qr generator", "qr code styling", "vcard qr", "wifi qr"],
  openGraph: {
    title: "QR Studio — Beautiful QR Code Generator",
    description: "Create beautiful, customizable QR codes instantly. Free and private.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
