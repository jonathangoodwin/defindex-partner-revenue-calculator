import type React from "react"
import type { Metadata } from "next"
import { Familjen_Grotesk, Inter_Tight } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const familjenGrotesk = Familjen_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
})

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "DeFindex Partner Revenue Calculator",
  description: "Calculate your potential revenue from integrating DeFindex automated stablecoin yield solution",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${familjenGrotesk.variable} ${interTight.variable} font-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
