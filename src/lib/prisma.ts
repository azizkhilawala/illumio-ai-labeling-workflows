import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit from hot reloading.
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pg.Pool | undefined;
};

// Create PostgreSQL connection pool (reuse in development)
const pool =
  globalForPrisma.pool ??
  new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });

// Create Prisma adapter for direct PostgreSQL connection
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}

export default prisma;
