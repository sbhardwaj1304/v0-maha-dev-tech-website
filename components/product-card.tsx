"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    title: string
    description: string
    image: string
    features?: string[]
    specifications?: Record<string, string>
    category?: string
  }
  variant?: "default" | "compact"
  className?: string
}

// Helper function to convert title to slug
function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
}

export function ProductCard({ product, variant = "default", className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate slug from product title
  const slug = titleToSlug(product.title.split("(")[0].trim())

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/20 hover:-translate-y-1",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/30">
        <div
          className={cn(
            "absolute inset-0 transition-transform duration-500 ease-in-out",
            isHovered ? "scale-105" : "scale-100",
          )}
        >
          <Image src={product.image || "/placeholder.svg"} alt={product.title} fill className="object-cover" />
        </div>
        {product.category && (
          <Badge className="absolute left-3 top-3 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm">
            {product.category}
          </Badge>
        )}
      </div>

      <div className="flex flex-col space-y-2.5 p-4">
        <Link href={`/products/${slug}`}>
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight tracking-tight hover:text-primary cursor-pointer transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>

        {variant === "default" && product.features && product.features.length > 0 && (
          <div className="mt-1 space-y-1.5">
            <p className="text-xs font-medium text-muted-foreground">Key Features:</p>
            <ul className="space-y-1">
              {product.features.slice(0, 2).map((feature, i) => (
                <li key={i} className="flex items-start text-xs">
                  <ChevronRight className="h-3.5 w-3.5 text-primary shrink-0 mt-px" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
              {product.features.length > 2 && (
                <li className="text-xs text-primary">
                  <Link href={`/products/${slug}`} className="cursor-pointer hover:underline">
                    + {product.features.length - 2} more features
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-border/40 p-4 pt-3">
        <Link
          href={`/products/${slug}`}
          className="group/link inline-flex items-center text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          View Details
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
        </Link>
      </div>
    </div>
  )
}
