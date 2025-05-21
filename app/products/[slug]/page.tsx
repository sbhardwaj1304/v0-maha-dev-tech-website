import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowLeft, CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Import the product data
import { products } from "@/lib/product-data"

// Define the page props type
interface ProductDetailPageProps {
  params: {
    slug: string
  }
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = params
  const product = products[slug]

  if (!product) {
    notFound()
  }

  // Get related products data
  const relatedProductsData = product.relatedProducts
    ? product.relatedProducts
        .filter((relatedSlug) => products[relatedSlug]) // Filter out any invalid slugs
        .map((relatedSlug) => ({
          slug: relatedSlug,
          ...products[relatedSlug],
        }))
    : []

  return (
    <>
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-blue-50 via-blue-50/80 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-background">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link
              href="/products"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-start">
            <div className="relative aspect-square overflow-hidden rounded-xl border border-border/40 shadow-lg bg-background">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                fill
                className="object-cover object-center"
                priority
              />
              {product.category && (
                <Badge className="absolute left-4 top-4 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm">
                  {product.category}
                </Badge>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{product.title}</h1>
                <p className="mt-4 text-muted-foreground">{product.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button asChild variant="outline-primary" size="lg" className="w-full sm:w-auto">
                  <Link href="/contact">Contact Sales Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="specifications" className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="applications" className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold mb-4">Common Applications</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {product.applications &&
                    product.applications.map((application, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span>{application}</span>
                      </div>
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documentation" className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold mb-4">Product Documentation</h3>
                <p className="text-muted-foreground mb-4">
                  Download technical documentation and resources for {product.title}.
                </p>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Download Technical Datasheet
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Download Installation Guide
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Download CAD Drawings
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {relatedProductsData.length > 0 && (
        <section className="py-12 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8">Related Products</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProductsData.map((relatedProduct, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-border/40 hover:shadow-md transition-all hover:border-primary/20"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover"
                    />
                    {relatedProduct.category && (
                      <Badge className="absolute left-3 top-3 bg-primary/80 hover:bg-primary/90 backdrop-blur-sm">
                        {relatedProduct.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold line-clamp-1">{relatedProduct.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{relatedProduct.description}</p>
                    <Button asChild variant="link" className="p-0 h-auto mt-2">
                      <Link href={`/products/${relatedProduct.slug}`} className="inline-flex items-center text-primary">
                        View Details
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild size="lg">
                <Link href="/products">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
