import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const data = await request.formData()
  const firstName = data.get("firstName")
  const lastName = data.get("lastName")
  const email = data.get("email")
  const phone = data.get("phone")
  const subject = data.get("subject")
  const message = data.get("message")

  // Here you would typically save this data to a database
  // For this example, we'll just log it
  console.log("Form submission:", { firstName, lastName, email, phone, subject, message })

  // In a real application, you might want to send an email notification here

  return NextResponse.json({ message: "Form submitted successfully" })
}
