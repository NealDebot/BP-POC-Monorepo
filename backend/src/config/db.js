import {PrismaClient} from "@prisma/client";
import {PrismaMssql} from "@prisma/adapter-mssql"

const adapter = new PrismaMssql({
    server: process.env.DATABASE_SERVER,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PSWD,
    options: {
        trustServerCertificate: true,
    }
});

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter: adapter
})

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log("DB Connected via Prisma")
    } catch (error) {
        console.error(`Database connection error: ${error.message}`)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    await prisma.$disconnect()
}

export {prisma, connectDB, disconnectDB}