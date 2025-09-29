import { NextResponse } from "next/server"
import { getMongoClient, getDbName } from "@/lib/mongodb"
import { addSubmissionFallback } from "@/lib/fallback-store"

export async function POST(request: Request) {
  const data = await request.formData()
  const firstName = String(data.get("firstName") || "").trim()
  const lastName = String(data.get("lastName") || "").trim()
  const email = String(data.get("email") || "").trim()
  const phone = String(data.get("phone") || "").trim()
  const subject = String(data.get("subject") || "").trim()
  const message = String(data.get("message") || "").trim()

  const record = {
    name: [firstName, lastName].filter(Boolean).join(" ").trim() || firstName || lastName || "Unknown",
    email,
    phone,
    message: subject ? `${subject} — ${message}` : message,
    createdAt: new Date().toISOString(),
  }

  try {
    const client = await getMongoClient()
    if (client) {
      const db = client.db(getDbName())
      await db.collection("submissions").insertOne(record)
    } else {
      await addSubmissionFallback(record)
    }
  } catch (e) {
    // fallback store on any db error
    await addSubmissionFallback(record)
  }

  return NextResponse.json({ message: "Form submitted successfully" })
}
