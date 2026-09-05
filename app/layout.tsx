import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://brown-and-gaines.jbg333.chatgpt.site"),
  title: "Brown & Gaines | Business Strategy & Implementation",
  description: "Brown & Gaines brings business strategy, coaching, applied AI, and systems together to build what your business needs next. Founded in Detroit.",
  alternates: { canonical: "/" },
  openGraph: {title: "Brown & Gaines | Build what your business needs next.", description: "Business strategy, applied AI, and human connection. A firm built around the decisions and systems your business needs.",type:"website",url:"/",siteName:"Brown & Gaines"},
  twitter: {card:"summary",title:"Brown & Gaines",description:"Business strategy and implementation. Build what your business needs next."},
  icons: {icon:"/favicon.svg",shortcut:"/favicon.svg"},
};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><head><link rel="preload" href="/fonts/caslon.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/><link rel="preload" href="/fonts/dm-sans.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
