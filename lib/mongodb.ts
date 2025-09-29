import "server-only"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || ""

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined
}

export async function getMongoClient() {
  if (!uri) {
    // No URI configured
    return null
  }
  if (!global._mongoClient) {
    const client = new MongoClient(uri)
    await client.connect()
    global._mongoClient = client
  }
  return global._mongoClient
}

export function getDbName() {
  return process.env.MONGODB_DB || "mahadev_tech"
}
