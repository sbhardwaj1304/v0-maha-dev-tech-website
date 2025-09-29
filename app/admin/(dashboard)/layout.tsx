import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { isAuthenticated, clearSessionCookie } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Inbox, Settings, LogOut } from "lucide-react"

export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const authed = isAuthenticated()
  if (!authed) {
    redirect("/admin/login")
  }

  async function LogoutButton() {
    "use server"
    await clearSessionCookie()
    redirect("/admin/login")
  }

  return (
    <div className="flex min-h-[80vh]">
      <aside className="hidden md:flex w-60 flex-col border-r bg-card">
        <div className="p-4 border-b">
          <span className="font-bold tracking-tight text-primary">Admin</span>
        </div>
        <nav className="flex-1 p-2">
          <Link
            href="/admin/submissions"
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Inbox className="h-4 w-4" />
            Submissions
          </Link>
          <Link
            href="/admin/settings"
            className={cn(
              "mt-1 flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
        <form action={LogoutButton} className="p-2 border-t">
          <Button type="submit" variant="outline" className="w-full bg-transparent">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </form>
      </aside>
      <div className="flex-1">
        <header className="md:hidden sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center justify-between">
            <span className="font-semibold">Admin</span>
            <form
              action={async () => {
                "use server"
                await clearSessionCookie()
                redirect("/admin/login")
              }}
            >
              <Button type="submit" size="sm" variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </header>
        <main className="container p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
