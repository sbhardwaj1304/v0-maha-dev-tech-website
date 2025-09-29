import "server-only"

type Submission = {
  name: string
  email: string
  phone?: string
  message: string
  createdAt: string
}

declare global {
  // eslint-disable-next-line no-var
  var _submissionsCache: Submission[] | undefined
}

function ensureStore() {
  if (!global._submissionsCache) {
    global._submissionsCache = []
  }
  return global._submissionsCache
}

export async function addSubmissionFallback(data: Submission) {
  const store = ensureStore()
  store.push(data)
}

export async function querySubmissionsFallback(params: {
  search?: string
  sortBy?: "name" | "createdAt"
  sortDir?: "asc" | "desc"
  page?: number
  pageSize?: number
}) {
  const store = ensureStore()
  const { search = "", sortBy = "createdAt", sortDir = "desc", page = 1, pageSize = 10 } = params

  let items = store.slice()

  if (search) {
    const q = search.toLowerCase()
    items = items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        (s.phone || "").toLowerCase().includes(q) ||
        s.message.toLowerCase().includes(q),
    )
  }

  items.sort((a, b) => {
    let cmp = 0
    if (sortBy === "name") {
      cmp = a.name.localeCompare(b.name)
    } else {
      cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }
    return sortDir === "asc" ? cmp : -cmp
  })

  const total = items.length
  const start = (page - 1) * pageSize
  const paged = items.slice(start, start + pageSize)

  return { items: paged, total }
}
