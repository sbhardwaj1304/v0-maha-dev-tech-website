import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ChevronRight, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCarousel } from "@/components/product-carousel"
import { ProductCard } from "@/components/product-card"

export default function Home() {
  const carouselImages = [
    { src: "/assets/product1.png", alt: "Power Control Centre Panel" },
    { src: "/assets/product2.png", alt: "Motor Control Centre Panel" },
    { src: "/assets/product3.png", alt: "Electrical Control Panel" },
    { src: "/assets/product4.png", alt: "Distribution Board" },
    { src: "/assets/product5.png", alt: "Fire Control Panel" },
    { src: "/assets/product6.png", alt: "Bus Duct System" },
    { src: "/assets/product7.png", alt: "MAHADEV TECH manufacturing facility" },
  ]

  // Simplified product data for the homepage
  const products = [
    {
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
      ],
    },
    {
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
      ],
    },
    {
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
      ],
    },
    {
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
      ],
    },
    {
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
      ],
    },
    {
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
      ],
    },
  ]

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-blue-50/80 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-background">
        <div className="absolute inset-0 bg-grid-pattern bg-top [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative px-4 py-12 md:px-6 md:py-24 lg:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Trusted by Industry Leaders
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Quality Electrical Solutions for Industrial Applications
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                MAHADEV TECH is a leading manufacturer of high-quality electrical control panels, distribution systems,
                and power management solutions. Serving industries since 1998.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="group">
                  <Link href="/products">
                    Explore Products
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </Button>
                <Button asChild variant="outline-primary" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none h-[400px]">
              <ProductCarousel images={carouselImages} className="h-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[800px]">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Our Products
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Comprehensive Electrical Solutions
              </h2>
              <p className="text-muted-foreground md:text-xl">
                We manufacture a wide range of electrical equipment designed for reliability, performance, and safety.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" size="lg" className="mt-4" asChild>
              <Link href="/products" className="group">
                View All Products
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-5">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Why Choose Us
              </div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Engineering Excellence & Quality Assurance
              </h2>
              <p className="text-muted-foreground md:text-lg">
                With years of experience in electrical manufacturing, MAHADEV TECH has established itself as a trusted
                partner for industries across India.
              </p>
              <ul className="grid gap-3 py-4">
                {[
                  "ISO 9001:2015 certified company",
                  "CPRI certified products",
                  "Up to IP-55 approved",
                  "Customized solutions for specific requirements",
                  "Rigorous quality control and testing",
                  "Experienced engineering team",
                  "Prompt after-sales service",
                ].map((point, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="relative h-[400px] overflow-hidden rounded-xl border border-border/40 shadow-lg">
                <Image
                  src="/assets/product7.png"
                  fill
                  alt="MAHADEV TECH manufacturing facility"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[800px]">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Our Clients
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Trusted by Industry Leaders</h2>
              <p className="text-muted-foreground md:text-lg">
                We've provided electrical solutions to clients across various industries.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 py-12 md:grid-cols-4">
            {[
              { name: "Flovel Energy Pvt. Ltd.", logo: "/placeholder.svg" },
              { name: "SGS Control & Solution Pvt. Ltd.", logo: "/placeholder.svg" },
              { name: "PP Rolling Mill Pvt. Ltd.", logo: "/placeholder.svg" },
              { name: "PWD, Delhi", logo: "/assets/pwd-logo.jpg" },
              { name: "Escort Tractor", logo: "/placeholder.svg" },
              { name: "GKN Driveline", logo: "/placeholder.svg" },
              { name: "Sanden Vikas India Ltd.", logo: "/placeholder.svg" },
              { name: "Police Line, Mathura UP", logo: "/placeholder.svg" },
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-center p-4 group">
                <div className="text-center">
                  <div className="relative h-20 w-40 mx-auto mb-3 overflow-hidden rounded-md border border-border/20 bg-background p-2">
                    <Image
                      src={client.logo || "/placeholder.svg"}
                      fill
                      alt={`${client.name} logo`}
                      className="mx-auto object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {client.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2 max-w-[800px]">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get in Touch</h2>
              <p className="text-muted-foreground md:text-lg">
                Contact our team for inquiries, quotes, or technical support.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
            <Card className="hover:shadow-md transition-all border-border/40 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Call Us</h3>
                <p className="text-center text-muted-foreground">Our team is available during business hours</p>
                <p className="text-center font-medium">+91 9818670416</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all border-border/40 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Email Us</h3>
                <p className="text-center text-muted-foreground">Send us an email for any inquiries</p>
                <p className="text-center font-medium">mahadevtechindia@gmail.com</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all border-border/40 bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center space-y-3 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Visit Us</h3>
                <p className="text-center text-muted-foreground">Our office and manufacturing facility</p>
                <p className="text-center font-medium">Faridabad, Haryana</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
