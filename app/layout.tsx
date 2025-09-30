import type React from "react"
import "./globals.css"

import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { GeistSans } from "geist/font/sans"

export const metadata = {
  title: "MAHADEV TECH - Electrical Manufacturing Solutions",
  description:
    "Manufacturer of high-quality electrical control panels, distribution systems, and power management solutions for industrial applications.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn("min-h-screen bg-background antialiased", GeistSans.className)}>
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}
// font update verification