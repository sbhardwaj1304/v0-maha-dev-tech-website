"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Phone, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

const mainNav = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Products", href: "/products" },
  { title: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activePath, setActivePath] = React.useState("")

  React.useEffect(() => {
    setActivePath(window.location.pathname)

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 transition-all duration-200 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        isScrolled ? "border-border/40 shadow-sm" : "border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold tracking-tight text-primary">MAHADEV TECH</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                activePath === item.href ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden md:flex items-center gap-2">
            <div className="rounded-full bg-primary/10 p-1.5">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-medium">+91 9818670416</span>
          </div>

          <Button asChild>
            <Link href="/contact">
              Get a Quote
              <span className="absolute -bottom-px left-0 h-0.5 w-0 bg-primary-foreground transition-all group-hover:w-full" />
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold">MAHADEV TECH</span>
              </Link>
              <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </SheetClose>
            </div>
            <nav className="mt-8 flex flex-col space-y-4">
              {mainNav.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                      activePath === item.href
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </SheetClose>
              ))}
              <div className="mt-2 space-y-4 pt-4 border-t">
                <div className="flex items-center gap-2 px-2">
                  <div className="rounded-full bg-primary/10 p-1.5">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">+91 9818670416</span>
                </div>
                <SheetClose asChild>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get a Quote</Link>
                  </Button>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
