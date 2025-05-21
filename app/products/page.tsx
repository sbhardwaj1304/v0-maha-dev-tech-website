"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("control-panels")

  const controlPanels = [
    {
      title: "Power Control Centres (P.C.C.) Panels",
      description: "High-performance power distribution and control systems for industrial applications.",
      features: [
        "Robust construction",
        "Customizable configurations",
        "High short-circuit withstand capacity",
        "Reliable operation in harsh environments",
      ],
      image: "/assets/product1.png",
      category: "Control Panels",
      specifications: {
        "Voltage Rating": "Up to 1000V",
        "Current Rating": "Up to 6300A",
        "Protection Class": "IP42-IP54",
        Form: "Form 1-4b",
        Standards: "IS/IEC 61439-1&2",
      },
    },
    {
      title: "Motor Control Centres (M.C.C.) Panels",
      description: "Centralized control for multiple motors with protection and automation capabilities.",
      features: ["Integrated motor protection", "Modular design", "Easy maintenance", "Space-efficient layout"],
      image: "/assets/product2.png",
      category: "Control Panels",
      specifications: {
        "Voltage Rating": "Up to 690V",
        "Current Rating": "Up to 630A per feeder",
        "Protection Class": "IP42-IP54",
        Form: "Form 3b, 4a, 4b",
        Standards: "IS/IEC 61439-1&2",
      },
    },
    {
      title: "Auto Mains Failure (A.M.F.) DG Panels",
      description: "Automatic power backup systems for seamless operation during mains failure.",
      features: [
        "Automatic generator starting",
        "Smooth load transfer",
        "Programmable timers",
        "Comprehensive protection features",
      ],
      image: "/assets/product5.png",
      category: "Control Panels",
      specifications: {
        "Voltage Rating": "Up to 440V",
        "Current Rating": "Up to 3200A",
        "Protection Class": "IP42-IP54",
        Controller: "Microprocessor based",
        Standards: "IS/IEC 61439-1&2",
      },
    },
  ]

  const distributionSystems = [
    {
      title: "Distribution Boards",
      description: "Efficient power distribution solutions for commercial and industrial settings.",
      features: [
        "Compact design",
        "Multiple circuit configurations",
        "Reliable circuit protection",
        "Easy installation",
      ],
      image: "/assets/product4.png",
      category: "Distribution",
      specifications: {
        "Voltage Rating": "Up to 440V",
        "Current Rating": "Up to 630A",
        "Protection Class": "IP42-IP54",
        Ways: "4 to 24 ways",
        Standards: "IS/IEC 61439-3",
      },
    },
    {
      title: "Meter Boards",
      description: "Centralized metering solutions for multi-tenant buildings and industrial complexes.",
      features: [
        "Accurate energy monitoring",
        "Tamper-proof design",
        "Multiple meter configurations",
        "Weather-resistant enclosures",
      ],
      image: "/assets/enclosure-1.jpg",
      category: "Distribution",
      specifications: {
        "Voltage Rating": "Up to 440V",
        "Current Rating": "Up to 100A per meter",
        "Protection Class": "IP42-IP54",
        Meters: "Up to 24 meters",
        Standards: "IS/IEC 61439-3",
      },
    },
    {
      title: "Feeder Pillars",
      description: "Outdoor power distribution units for street lighting and public infrastructure.",
      features: [
        "Weather-proof construction",
        "Vandal-resistant design",
        "Multiple outgoing circuits",
        "Integrated protection",
      ],
      image: "/assets/enclosure-2.jpg",
      category: "Distribution",
      specifications: {
        "Voltage Rating": "Up to 440V",
        "Current Rating": "Up to 630A",
        "Protection Class": "IP55-IP65",
        Material: "Stainless Steel/GI",
        Standards: "IS/IEC 61439-5",
      },
    },
  ]

  const automationSystems = [
    {
      title: "PLC Based DG Synchronizing Panels",
      description: "Advanced automation for generator synchronization and load management.",
      features: [
        "Automatic load sharing",
        "Seamless generator synchronization",
        "Real-time monitoring",
        "Programmable operation sequences",
      ],
      image: "/assets/product3.png",
      category: "Automation",
      specifications: {
        "PLC Type": "Siemens/Allen Bradley/Schneider",
        "I/O Capacity": "Scalable as per requirement",
        Communication: "Modbus/Profibus/Ethernet",
        HMI: "Touch screen interface",
        "Protection Class": "IP54",
      },
    },
    {
      title: "AC-DC Drive Panels",
      description: "Precise motor speed control for industrial applications.",
      features: [
        "Energy-efficient operation",
        "Smooth acceleration/deceleration",
        "Overload protection",
        "Multiple control modes",
      ],
      image: "/assets/product2.png",
      category: "Automation",
      specifications: {
        "Drive Type": "VFD/Soft Starter",
        "Power Range": "0.75kW to 500kW",
        Control: "Local/Remote",
        "Protection Class": "IP42-IP54",
        Standards: "IEC 61800",
      },
    },
    {
      title: "Soft Starter Panels",
      description: "Reduced starting current and mechanical stress for motor applications.",
      features: [
        "Reduced mechanical stress",
        "Lower starting current",
        "Adjustable ramp times",
        "Motor protection features",
      ],
      image: "/assets/product1.png",
      category: "Automation",
      specifications: {
        "Current Rating": "Up to 1000A",
        "Voltage Rating": "Up to 690V",
        Control: "Digital with display",
        "Protection Class": "IP42-IP54",
        Standards: "IEC 60947-4-2",
      },
    },
  ]

  const accessories = [
    {
      title: "Compact and Segregated Bus Duct",
      description: "Efficient power distribution systems for connecting transformers to switchgear.",
      features: [
        "Low power losses",
        "Compact design",
        "High short-circuit withstand",
        "Easy installation and maintenance",
      ],
      image: "/assets/product6.png",
      category: "Accessories",
      specifications: {
        "Current Rating": "Up to 6300A",
        "Voltage Rating": "Up to 1000V",
        "IP Rating": "IP42-IP54",
        "Short Circuit": "Up to 100kA",
        Standards: "IEC 61439-6",
      },
    },
    {
      title: "Cable Trays",
      description: "Organized cable management solutions for industrial and commercial applications.",
      features: ["Multiple configurations", "Corrosion-resistant materials", "Easy installation", "Scalable design"],
      image: "/assets/product6.png",
      category: "Accessories",
      specifications: {
        Material: "GI/SS/Aluminum",
        Width: "50mm to 900mm",
        Height: "25mm to 150mm",
        Thickness: "1.2mm to 3mm",
        Finish: "Hot Dip Galvanized",
      },
    },
    {
      title: "Electrical Enclosures & Junction Boxes",
      description: "Protective housings for electrical components in various environments.",
      features: [
        "IP-rated protection",
        "Customizable dimensions",
        "Multiple material options",
        "Weather-resistant designs",
      ],
      image: "/assets/enclosure-2.jpg",
      category: "Accessories",
      specifications: {
        Material: "MS/SS/GI",
        "IP Rating": "IP42-IP65",
        Sizes: "Custom as per requirement",
        Mounting: "Wall/Floor/Pole",
        Finish: "Powder Coated/Painted",
      },
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-50/80 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-background">
        <div className="absolute inset-0 bg-grid-pattern bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative px-4 py-12 md:px-6 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Products</h1>
            <p className="mt-4 text-muted-foreground md:text-xl">
              Discover our comprehensive range of high-quality electrical equipment designed for reliability,
              performance, and safety.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="control-panels" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="mb-8 overflow-x-auto pb-2">
              <TabsList className="inline-flex w-full justify-start md:justify-center">
                <TabsTrigger value="control-panels" className="min-w-[150px]">
                  Control Panels
                </TabsTrigger>
                <TabsTrigger value="distribution" className="min-w-[150px]">
                  Distribution Systems
                </TabsTrigger>
                <TabsTrigger value="automation" className="min-w-[150px]">
                  Automation
                </TabsTrigger>
                <TabsTrigger value="accessories" className="min-w-[150px]">
                  Accessories
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="control-panels" className="mt-6 space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {controlPanels.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="distribution" className="mt-6 space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {distributionSystems.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="automation" className="mt-6 space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {automationSystems.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="accessories" className="mt-6 space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {accessories.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Need a Custom Solution?</h2>
            <p className="mt-4 text-muted-foreground md:text-lg">
              We specialize in designing and manufacturing custom electrical solutions tailored to your specific
              requirements.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="group">
                <Link href="/contact">
                  Request a Quote
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline-primary" size="lg">
                <Link href="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
