import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carta para Noe",
  description: "Una carta interactiva sincronizada con música",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${playfair.variable} ${dancing.variable}`}>
      <head>
        {/* SVG filter definitions available globally */}
        <svg
          aria-hidden="true"
          style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
        >
          <defs>
            <filter id="canvas-texture" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
                result="noise"
              />
              <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
              <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blended" />
              <feComposite in="blended" in2="SourceGraphic" operator="in" />
            </filter>
            <filter id="glow-gold">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glow-blue">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="thread-texture">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.9"
                numOctaves="2"
                result="turbulence"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="3"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
        </svg>
      </head>
      <body className="bg-[#0a0a0f] text-[#e8e0d0] antialiased overflow-hidden h-screen">
        {children}
      </body>
    </html>
  );
}
