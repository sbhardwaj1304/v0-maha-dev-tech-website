import "server-only"
import crypto from "crypto"
import { cookies } from "next/headers"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin"
const ADMIN_SECRET = process.env.ADMIN_SECRET || "dev-secret-change-me"

// very small helper; in production set env vars above on Vercel
export function validateCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

function sign(payload: string) {
  return crypto.createHmac("sha256", ADMIN_SECRET).update(payload).digest("hex")
}

export function createSessionToken(username: string) {
  const payload = JSON.stringify({ u: username, iat: Date.now() })
  const sig = sign(payload)
  const token = Buffer.from(payload).toString("base64") + "." + sig
  return token
}

export function verifySessionToken(token?: string | null, maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
  if (!token) return false
  const [b64, sig] = token.split(".")
  if (!b64 || !sig) return false
  const payload = Buffer.from(b64, "base64").toString("utf8")
  const expected = sign(payload)
  if (expected !== sig) return false
  try {
    const data = JSON.parse(payload) as { u: string; iat: number }
    if (!data?.iat || Date.now() - data.iat > maxAgeMs) return false
    return true
  } catch {
    return false
  }
}

export async function setSessionCookie(token: string) {
  cookies().set("admin_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
}

export async function clearSessionCookie() {
  cookies().set("admin_session", "", { path: "/", maxAge: 0 })
}

export function isAuthenticated() {
  const token = cookies().get("admin_session")?.value
  return verifySessionToken(token)
}
