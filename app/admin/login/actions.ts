"use server"

import { createSessionToken, setSessionCookie, validateCredentials } from "@/lib/auth"

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "")
  const password = String(formData.get("password") || "")

  const ok = validateCredentials(username, password)
  if (!ok) {
    return { success: false, error: "Invalid credentials" }
  }
  const token = createSessionToken(username)
  await setSessionCookie(token)
  return { success: true }
}
