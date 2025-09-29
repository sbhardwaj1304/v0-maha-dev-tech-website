import { NextResponse } from "next/server"
import { getMongoClient, getDbName } from "@/lib/mongodb"
import { querySubmissionsFallback } from "@/lib/fallback-store"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const page = Number(searchParams.get("page") || "1")
  const pageSize = Number(searchParams.get("pageSize") || "10")
  const search = (searchParams.get("search") || "").trim()
  const sortBy = (searchParams.get("sortBy") || "createdAt") as "name" | "createdAt"
  const sortDir = (searchParams.get("sortDir") || "desc") as "asc" | "desc"

  const client = await getMongoClient()

  if (!client) {
    const result = await querySubmissionsFallback({ page, pageSize, search, sortBy, sortDir })
    return NextResponse.json(result)
  }

  const db = client.db(getDbName())
  const col = db.collection("submissions")

  const filter: Record<string, any> = {}
  if (search) {
    const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
    filter.$or = [{ name: regex }, { email: regex }, { phone: regex }, { message: regex }]
  }

  const sort: Record<string, 1 | -1> = { [sortBy]: sortDir === "asc" ? 1 : -1 }

  const total = await col.countDocuments(filter)
  const items = await col
    .find(filter, { projection: { _id: 0 } })
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .toArray()

  return NextResponse.json({ items, total })
}
