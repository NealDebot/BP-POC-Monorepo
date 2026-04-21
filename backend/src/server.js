import app from './index.js'
import {disconnectDB} from './config/db.js'

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

process.on("unhandledRejection", (error) => {
    console.error("Unhandled Rejection:", error)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

process.on("uncaughtException", async (error) => {
    console.error("Uncaught Exception:", error)
    await disconnectDB()
    process.exit(1)
})

process.on("SIGTERM", () => {
    console.error("SIGTERM received, shutting down gracefully")
    server.close(async () => {
        await disconnectDB()
        process.exit(0)
    })
})