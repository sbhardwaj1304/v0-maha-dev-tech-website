import { NextResponse } from "next/server"
import { getMongoClient, getDbName } from "@/lib/mongodb"
import { querySubmissionsFallback } from "@/lib/fallback-store"
import * as XLSX from "xlsx"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const format = (searchParams.get("format") || "csv") as "csv" | "xlsx"
  const search = (searchParams.get("search") || "").trim()
  const sortBy = (searchParams.get("sortBy") || "createdAt") as "name" | "createdAt"
  const sortDir = (searchParams.get("sortDir") || "desc") as "asc" | "desc"

  const client = await getMongoClient()
  let items: any[] = []

  if (!client) {
    const result = await querySubmissionsFallback({ page: 1, pageSize: 100000, search, sortBy, sortDir })
    items = result.items
  } else {
    const db = client.db(getDbName())
    const col = db.collection("submissions")

    const filter: Record<string, any> = {}
    if (search) {
      const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
      filter.$or = [{ name: regex }, { email: regex }, { phone: regex }, { message: regex }]
    }
    const sort: Record<string, 1 | -1> = { [sortBy]: sortDir === "asc" ? 1 : -1 }

    items = await col
      .find(filter, { projection: { _id: 0 } })
      .sort(sort)
      .toArray()
  }

  if (format === "xlsx") {
    const ws = XLSX.utils.json_to_sheet(items)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Submissions")
    const ab = XLSX.write(wb, { type: "array", bookType: "xlsx" })
    return new Response(ab, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="submissions.xlsx"',
      },
    })
  }

  // CSV
  const headers = ["name", "email", "phone", "message", "createdAt"]
  const csvRows = [headers.join(",")]
  for (const item of items) {
    const row = headers
      .map((h) => {
        const v = (item as any)[h] ?? ""
        const s = String(v).replace(/"/g, '""')
        return `"${s}"`
      })
      .join(",")
    csvRows.push(row)
  }
  const csv = csvRows.join("\n")
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="submissions.csv"',
    },
  })
}
