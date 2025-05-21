"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { ChevronRight, ExternalLink, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface ProductDialogProps {
  product: {
    title: string
    description: string
    image: string
    features?: string[]
    specifications?: Record<string, string>
    category?: string
  }
  trigger: React.ReactNode
}

export function ProductDialog({ product, trigger }: ProductDialogProps) {
  const [isZoomed, setIsZoomed] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto p-0 gap-0 bg-background/95 backdrop-blur-sm border border-border/40 shadow-lg">
        <div className="relative w-full aspect-video md:aspect-[16/9] overflow-hidden bg-muted/30">
          <div
            className={cn(
              "absolute inset-0 transition-all duration-300 ease-in-out",
              isZoomed ? "scale-110" : "scale-100",
            )}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover object-center"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              priority
            />
          </div>
          <DialogClose className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground hover:text-foreground hover:bg-background/90 transition-colors">
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </DialogClose>
          {product.category && (
            <Badge className="absolute left-4 top-4 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm">
              {product.category}
            </Badge>
          )}
        </div>

        <div className="p-6 pt-5">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold tracking-tight">{product.title}</DialogTitle>
            <DialogDescription className="mt-2.5 text-base leading-relaxed">{product.description}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 md:grid-cols-2">
            {product.features && product.features.length > 0 && (
              <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border/40">
                <h4 className="font-semibold text-base flex items-center">
                  <span className="h-1 w-4 bg-primary rounded-full mr-2"></span>
                  Key Features
                </h4>
                <ul className="space-y-2.5">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-sm">
                      <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border/40">
                <h4 className="font-semibold text-base flex items-center">
                  <span className="h-1 w-4 bg-primary rounded-full mr-2"></span>
                  Specifications
                </h4>
                <div className="grid gap-y-2.5">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 text-sm">
                      <span className="text-muted-foreground font-medium">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/contact">
                Request a Quote
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline-primary" size="lg" className="w-full sm:w-auto">
              <Link href={`/products`}>View Details</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
