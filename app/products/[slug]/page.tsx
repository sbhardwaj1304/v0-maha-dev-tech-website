import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowLeft, CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const products = {
  "power-control-centres": {
    title: "Power Control Centres (P.C.C.) Panels",
    description:
      "High-performance power distribution and control systems for industrial applications. Our PCC panels are designed to provide reliable power distribution with maximum safety and efficiency.",
    image: "/assets/product1.png",
    category: "Control Panels",
    features: [
      "Robust construction with high-quality sheet metal",
      "Customizable configurations to meet specific requirements",
      "High short-circuit withstand capacity up to 50kA",
      "Reliable operation in harsh environments",
      "IP54 protection available for dust and water resistance",
      "Modular design for easy maintenance and future expansion",
    ],
    specifications: {
      "Voltage Rating": "Up to 1000V",
      "Current Rating": "Up to 6300A",
      "Protection Class": "IP42-IP54",
      Form: "Form 1-4b",
      Standards: "IS/IEC 61439-1&2",
    },
    applications: [
      "Industrial manufacturing plants",
      "Commercial buildings",
      "Data centers",
      "Healthcare facilities",
      "Educational institutions",
      "Infrastructure projects",
    ],
    relatedProducts: ["motor-control-centres", "auto-mains-failure-panels", "distribution-boards"],
  },
  "motor-control-centres": {
    title: "Motor Control Centres (M.C.C.) Panels",
    description:
      "Centralized control for multiple motors with protection and automation capabilities. Our MCC panels provide comprehensive motor management with advanced protection features.",
    image: "/assets/product2.png",
    category: "Control Panels",
    features: [
      "Integrated motor protection with thermal and electronic overload relays",
      "Modular design with withdrawable modules for easy maintenance",
      "Easy maintenance with front access to all components",
      "Space-efficient layout for maximum component density",
      "Available with variable frequency drives for speed control",
      "Remote monitoring and control capabilities",
    ],
    specifications: {
      "Voltage Rating": "Up to 690V",
      "Current Rating": "Up to 630A per feeder",
      "Protection Class": "IP42-IP54",
      Form: "Form 3b, 4a, 4b",
      Standards: "IS/IEC 61439-1&2",
    },
    applications: [
      "Manufacturing facilities",
      "Water treatment plants",
      "HVAC systems",
      "Conveyor systems",
      "Pumping stations",
      "Mining operations",
    ],
    relatedProducts: ["power-control-centres", "auto-mains-failure-panels", "plc-based-systems"],
  },
  "auto-mains-failure-panels": {
    title: "Auto Mains Failure (A.M.F.) DG Panels",
    description:
      "Automatic power backup systems for seamless operation during mains failure. Our AMF panels ensure continuous power supply with minimal interruption.",
    image: "/assets/product5.png",
    category: "Control Panels",
    features: [
      "Automatic generator starting upon mains failure",
      "Smooth load transfer between mains and generator",
      "Programmable timers for startup and cooldown",
      "Comprehensive protection features for generator and load",
      "Digital display for system parameters and status",
      "Manual override capability for maintenance",
    ],
    specifications: {
      "Voltage Rating": "Up to 440V",
      "Current Rating": "Up to 3200A",
      "Protection Class": "IP42-IP54",
      Controller: "Microprocessor based",
      Standards: "IS/IEC 61439-1&2",
    },
    applications: [
      "Hospitals and healthcare facilities",
      "Data centers",
      "Telecommunications",
      "Commercial buildings",
      "Industrial plants",
      "Critical infrastructure",
    ],
    relatedProducts: ["power-control-centres", "motor-control-centres", "distribution-boards"],
  },
  "distribution-boards": {
    title: "Distribution Boards",
    description:
      "Efficient power distribution solutions for commercial and industrial settings. Our distribution boards provide safe and reliable power distribution with optimal space utilization.",
    image: "/assets/product4.png",
    category: "Distribution",
    features: [
      "Compact design for space-constrained installations",
      "Multiple circuit configurations with MCBs, RCCBs, and MCCBs",
      "Reliable circuit protection with coordinated devices",
      "Easy installation with accessible terminations",
      "Available in single phase and three phase configurations",
      "Surface or flush mounting options",
    ],
    specifications: {
      "Voltage Rating": "Up to 440V",
      "Current Rating": "Up to 630A",
      "Protection Class": "IP42-IP54",
      Ways: "4 to 24 ways",
      Standards: "IS/IEC 61439-3",
    },
    applications: [
      "Residential buildings",
      "Commercial complexes",
      "Office spaces",
      "Retail establishments",
      "Light industrial applications",
      "Educational institutions",
    ],
    relatedProducts: ["power-control-centres", "meter-boards", "feeder-pillars"],
  },
  "plc-based-systems": {
    title: "PLC Based Systems",
    description:
      "Advanced automation solutions with programmable logic controllers for DG synchronizing and load sharing. Our PLC systems provide intelligent control for complex applications.",
    image: "/assets/product3.png",
    category: "Automation",
    features: [
      "Automatic load sharing between multiple generators",
      "Seamless generator synchronization with mains and other generators",
      "Real-time monitoring of all system parameters",
      "Programmable operation sequences for different scenarios",
      "Data logging and event recording for analysis",
      "Remote monitoring and control via SCADA integration",
    ],
    specifications: {
      "PLC Type": "Siemens/Allen Bradley/Schneider",
      "I/O Capacity": "Scalable as per requirement",
      Communication: "Modbus/Profibus/Ethernet",
      HMI: "Touch screen interface",
      "Protection Class": "IP54",
    },
    applications: [
      "Power generation facilities",
      "Manufacturing automation",
      "Process control systems",
      "Building management systems",
      "Water and wastewater treatment",
      "Oil and gas industry",
    ],
    relatedProducts: ["motor-control-centres", "ac-dc-drive-panels", "auto-mains-failure-panels"],
  },
  "apfc-panels": {
    title: "APFC Panels",
    description:
      "Automatic Power Factor Correction panels for improved energy efficiency and reduced electricity costs. Our APFC panels maintain optimal power factor under varying load conditions.",
    image: "/assets/product6.png",
    category: "Power Quality",
    features: [
      "Automatic switching of capacitor banks based on load",
      "Microprocessor-based controller for precise correction",
      "Harmonic filtering options for non-linear loads",
      "Individual capacitor protection with fuses or MCBs",
      "Digital display for power factor and system parameters",
      "Compact design with high-quality capacitors",
    ],
    specifications: {
      "Voltage Rating": "Up to 440V",
      "Capacitor Rating": "5 to 500 kVAR",
      Controller: "6 to 12 stage microprocessor",
      "Protection Class": "IP42-IP54",
      Standards: "IS/IEC 61439-1&2",
    },
    applications: [
      "Industrial facilities with inductive loads",
      "Commercial buildings",
      "Manufacturing plants",
      "Textile industries",
      "Metal processing units",
      "Facilities with penalty for low power factor",
    ],
    relatedProducts: ["power-control-centres", "motor-control-centres", "distribution-boards"],
  },
  "meter-boards": {
    title: "Meter Boards",
    description: "Centralized metering solutions for multi-tenant buildings and industrial complexes.",
    image: "/assets/enclosure-1.jpg",
    category: "Distribution",
    features: [
      "Accurate energy monitoring",
      "Tamper-proof design",
      "Multiple meter configurations",
      "Weather-resistant enclosures",
      "Customizable layouts for different requirements",
      "Compatible with various meter types",
    ],
    specifications: {
      "Voltage Rating": "Up to 440V",
      "Current Rating": "Up to 100A per meter",
      "Protection Class": "IP42-IP54",
      Meters: "Up to 24 meters",
      Standards: "IS/IEC 61439-3",
    },
    applications: [
      "Residential apartments",
      "Commercial complexes",
      "Shopping malls",
      "Industrial estates",
      "Office buildings",
      "Mixed-use developments",
    ],
    relatedProducts: ["distribution-boards", "feeder-pillars", "power-control-centres"],
  },
  "feeder-pillars": {
    title: "Feeder Pillars",
    description: "Outdoor power distribution units for street lighting and public infrastructure.",
    image: "/assets/enclosure-2.jpg",
    category: "Distribution",
    features: [
      "Weather-proof construction",
      "Vandal-resistant design",
      "Multiple outgoing circuits",
      "Integrated protection",
      "Durable construction for outdoor environments",
      "Lockable access for security",
    ],
    specifications: {
      "Voltage Rating": "Up to 440V",
      "Current Rating": "Up to 630A",
      "Protection Class": "IP55-IP65",
      Material: "Stainless Steel/GI",
      Standards: "IS/IEC 61439-5",
    },
    applications: [
      "Street lighting systems",
      "Traffic signal control",
      "Public parks and gardens",
      "Highway infrastructure",
      "Railway platforms",
      "Outdoor event spaces",
    ],
    relatedProducts: ["distribution-boards", "meter-boards", "power-control-centres"],
  },
  "ac-dc-drive-panels": {
    title: "AC-DC Drive Panels",
    description: "Precise motor speed control for industrial applications.",
    image: "/assets/product2.png",
    category: "Automation",
    features: [
      "Energy-efficient operation",
      "Smooth acceleration/deceleration",
      "Overload protection",
      "Multiple control modes",
      "Advanced diagnostics and monitoring",
      "Customizable for specific applications",
    ],
    specifications: {
      "Drive Type": "VFD/Soft Starter",
      "Power Range": "0.75kW to 500kW",
      Control: "Local/Remote",
      "Protection Class": "IP42-IP54",
      Standards: "IEC 61800",
    },
    applications: [
      "Conveyor systems",
      "Pump control",
      "Fan and blower applications",
      "Machine tools",
      "Textile machinery",
      "Material handling equipment",
    ],
    relatedProducts: ["motor-control-centres", "plc-based-systems", "soft-starter-panels"],
  },
  "soft-starter-panels": {
    title: "Soft Starter Panels",
    description: "Reduced starting current and mechanical stress for motor applications.",
    image: "/assets/product1.png",
    category: "Automation",
    features: [
      "Reduced mechanical stress",
      "Lower starting current",
      "Adjustable ramp times",
      "Motor protection features",
      "Bypass contactor for continuous operation",
      "Compact design for space-constrained installations",
    ],
    specifications: {
      "Current Rating": "Up to 1000A",
      "Voltage Rating": "Up to 690V",
      Control: "Digital with display",
      "Protection Class": "IP42-IP54",
      Standards: "IEC 60947-4-2",
    },
    applications: ["Water pumps", "Compressors", "Conveyors", "Fans and blowers", "Crushers and mills", "Centrifuges"],
    relatedProducts: ["motor-control-centres", "ac-dc-drive-panels", "plc-based-systems"],
  },
  "bus-duct-systems": {
    title: "Compact and Segregated Bus Duct",
    description: "Efficient power distribution systems for connecting transformers to switchgear.",
    image: "/assets/product6.png",
    category: "Accessories",
    features: [
      "Low power losses",
      "Compact design",
      "High short-circuit withstand",
      "Easy installation and maintenance",
      "Reduced voltage drop",
      "Flexible configuration options",
    ],
    specifications: {
      "Current Rating": "Up to 6300A",
      "Voltage Rating": "Up to 1000V",
      "IP Rating": "IP42-IP54",
      "Short Circuit": "Up to 100kA",
      Standards: "IEC 61439-6",
    },
    applications: [
      "Power plants",
      "Substations",
      "Data centers",
      "High-rise buildings",
      "Industrial facilities",
      "Commercial complexes",
    ],
    relatedProducts: ["power-control-centres", "motor-control-centres", "distribution-boards"],
  },
  "cable-trays": {
    title: "Cable Trays",
    description: "Organized cable management solutions for industrial and commercial applications.",
    image: "/assets/product6.png",
    category: "Accessories",
    features: [
      "Multiple configurations",
      "Corrosion-resistant materials",
      "Easy installation",
      "Scalable design",
      "Excellent heat dissipation",
      "Various mounting options",
    ],
    specifications: {
      Material: "GI/SS/Aluminum",
      Width: "50mm to 900mm",
      Height: "25mm to 150mm",
      Thickness: "1.2mm to 3mm",
      Finish: "Hot Dip Galvanized",
    },
    applications: [
      "Industrial facilities",
      "Commercial buildings",
      "Data centers",
      "Power plants",
      "Oil and gas facilities",
      "Infrastructure projects",
    ],
    relatedProducts: ["bus-duct-systems", "electrical-enclosures", "power-control-centres"],
  },
  "electrical-enclosures": {
    title: "Electrical Enclosures & Junction Boxes",
    description: "Protective housings for electrical components in various environments.",
    image: "/assets/enclosure-2.jpg",
    category: "Accessories",
    features: [
      "IP-rated protection",
      "Customizable dimensions",
      "Multiple material options",
      "Weather-resistant designs",
      "Various mounting configurations",
      "Secure locking mechanisms",
    ],
    specifications: {
      Material: "MS/SS/GI",
      "IP Rating": "IP42-IP65",
      Sizes: "Custom as per requirement",
      Mounting: "Wall/Floor/Pole",
      Finish: "Powder Coated/Painted",
    },
    applications: [
      "Industrial control systems",
      "Outdoor installations",
      "Telecommunications",
      "Building services",
      "Transportation infrastructure",
      "Utility services",
    ],
    relatedProducts: ["cable-trays", "distribution-boards", "feeder-pillars"],
  },
}

// Helper function to convert title to slug
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, "-")
}

// Helper function to get product by slug
function getProductBySlug(slug) {
  return products[slug] || null
}

export default function ProductDetailPage({ params }) {
  const { slug } = params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  // Get related products data
  const relatedProductsData = product.relatedProducts
    ? product.relatedProducts.map((relatedSlug) => ({
        slug: relatedSlug,
        ...getProductBySlug(relatedSlug),
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
                  {Object.entries(product.specifications).map(([key, value]) => (
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
                  {product.applications.map((application, index) => (
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
