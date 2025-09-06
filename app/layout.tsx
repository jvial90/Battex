import type { Metadata } from "next";
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




export const metadata: Metadata = {

  metadataBase: new URL("https://battex.cl"),
  title: "Battex — Expertos en Soluciones Energéticas",
  description: "Nuestro objetivo es ayudar a industrias a eficientar su consumo eléctrico",
  icons: {
    icon: "/tab-logo.png",         // your new gradient B favicon
    shortcut: "/tab-logo.png",     // for browsers that look for shortcut
    apple: "/tab-logo.png",        // also works for iOS unless you provide a bigger 180x180
 	 },
  openGraph: {
    title: "Battex",
    description: "Soluciones energéticas con almacenamiento inteligente",
    url: "https://battex.cl",
    siteName: "Battex",
    images: [
      {
        url: "/og-image.png", // optional social preview image
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_CL",
    type: "website",
  		},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
