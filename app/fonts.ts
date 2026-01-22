import { Geist, Geist_Mono, Instrument_Sans, Outfit } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  weight: "variable",
  subsets: ["latin"],
});

export const outfit = Outfit({
  variable: "--font-outfit",
  weight: "variable",
  subsets: ["latin"],
});
