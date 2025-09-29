"use client"

import { useEffect, useMemo, useState } from "react"
import { Download, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type Submission = {
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

type ApiResponse = {
  items: Submission[]
  total: number
}

export default function SubmissionsPage() {
  const [data, setData] = useState<Submission[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "createdAt">("createdAt")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [loading, setLoading] = useState(false)

  // debounced search
  const [searchInput, setSearchInput] = useState("")
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput), 300)
    return () => clearTimeout(t)
  }, [searchInput])

  async function fetchData() {
    setLoading(true)
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      sortBy,
      sortDir,
    })
    if (search) params.set("search", search)
    const res = await fetch(`/api/admin/submissions?${params.toString()}`, { cache: "no-store" })
    const json: ApiResponse = await res.json()
    setData(json.items)
    setTotal(json.total)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, sortBy, sortDir, page, pageSize])

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / pageSize)), [total, pageSize])

  function toggleSort(col: "name" | "createdAt") {
    if (sortBy !== col) {
      setSortBy(col)
      setSortDir("asc")
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    }
    setPage(1)
  }

  async function exportFile(format: "csv" | "xlsx") {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    params.set("sortBy", sortBy)
    params.set("sortDir", sortDir)
    params.set("format", format)
    const res = await fetch(`/api/admin/submissions/export?${params.toString()}`)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `submissions.${format === "csv" ? "csv" : "xlsx"}`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Submissions</div>
            <div className="mt-1 text-3xl font-bold">{total}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email, phone, message..."
            className="pl-8"
            value={searchInput}
            onChange={(e) => {
              setPage(1)
              setSearchInput(e.target.value)
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => exportFile("csv")}>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => exportFile("xlsx")}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <table className="min-w-[700px] w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th
                className="text-left px-3 py-2 cursor-pointer select-none"
                onClick={() => toggleSort("name")}
                aria-label="Sort by name"
              >
                <div className="inline-flex items-center gap-1">
                  Name
                  <SortIcon active={sortBy === "name"} dir={sortDir} />
                </div>
              </th>
              <th className="text-left px-3 py-2">Email</th>
              <th className="text-left px-3 py-2">Phone</th>
              <th className="text-left px-3 py-2">Message</th>
              <th
                className="text-left px-3 py-2 cursor-pointer select-none"
                onClick={() => toggleSort("createdAt")}
                aria-label="Sort by date"
              >
                <div className="inline-flex items-center gap-1">
                  Date
                  <SortIcon active={sortBy === "createdAt"} dir={sortDir} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading &&
              data.map((row, idx) => (
                <tr key={idx} className={cn("border-t")}>
                  <td className="px-3 py-2 font-medium">{row.name}</td>
                  <td className="px-3 py-2">{row.email}</td>
                  <td className="px-3 py-2">{row.phone || "-"}</td>
                  <td className="px-3 py-2 max-w-[360px]">
                    <div className="line-clamp-2">{row.message}</div>
                  </td>
                  <td className="px-3 py-2">{new Date(row.createdAt).toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
        {loading && <div className="p-4 text-sm text-muted-foreground">Loading...</div>}
        {!loading && data.length === 0 && <div className="p-4 text-sm text-muted-foreground">No results</div>}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
            Previous
          </Button>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
          <select
            className="ml-2 h-10 rounded-md border bg-background px-2 text-sm"
            value={pageSize}
            onChange={(e) => {
              setPage(1)
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 50, 100].map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  return (
    <svg
      className={cn("h-3 w-3 opacity-40", active && "opacity-100")}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {dir === "asc" ? <path d="M7 14l5-5 5 5H7z" /> : <path d="M7 10l5 5 5-5H7z" />}
    </svg>
  )
}
