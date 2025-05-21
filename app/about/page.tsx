import Image from "next/image"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
            About MAHADEV TECH
          </h1>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                MAHADEV TECH is one of India's premier Electric Switchboards and Panel boards manufacturer, exporter and
                supplier. Established in March 2021, we have quickly grown to become a trusted name in the electrical
                industry.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Our range of electric panels is used for industrial purposes, building or apartment construction
                organization purpose and custom built designs. We are a group of young, enterprising professionals
                having vast experience in the field of industrial automation & power distribution systems in respect of
                Electrical Engineering.
              </p>
            </div>
            <div className="mx-auto w-full max-w-[500px] lg:max-w-none">
              <Image
                src="/assets/product7.png"
                width={600}
                height={400}
                alt="MAHADEV TECH facility"
                className="w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
            Our Vision and Mission
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Vision</h3>
              <p className="text-gray-500 dark:text-gray-400">
                To become a market leader in Electrical Panel Manufacturing, providing innovative and reliable solutions
                to our customers.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Mission</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We are committed to satisfying our customers by providing quality products in time at competitive costs
                through continual improvements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
            Our Strengths
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Well experienced, dedicated & Qualified Electrical Engineers",
              "Diversified system Design & execution experience",
              "Very cost-effective & reliable solutions",
              "Strong service backup round the clock",
              "Well awareness of 'Building Blocks' available in market",
              "Proven track record of customer satisfaction",
            ].map((strength, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <p className="text-gray-500 dark:text-gray-400">{strength}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl text-center mb-8">
            Our Manufacturing Facilities
          </h2>
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Unit-1 (Electrical Panel Manufacturing)</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plot No.14, Gali No-1, Gazipur Industrial Area, Faridabad
              </p>
              <Image
                src="/assets/product1.png"
                width={400}
                height={300}
                alt="Unit-1 Facility"
                className="w-full rounded-lg object-cover shadow-lg"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Unit-2 (Powder Coating)</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Plot No.8, Gali No-8 East, Saroorpur Industrial Area, Faridabad
              </p>
              <Image
                src="/assets/product7.png"
                width={400}
                height={300}
                alt="Unit-2 Facility"
                className="w-full rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
