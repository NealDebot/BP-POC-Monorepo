import "dotenv/config";
import express from 'express'
import {auth} from 'express-openid-connect';
import {disconnectDB, connectDB} from './config/db.js'

//import Routes
import vragenlijstRoutes from './routes/vragenlijstRoutes.js'

connectDB()

const app = express();

// Auth0 configuration
const auth0Config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// Apply the auth middleware
app.use(auth(auth0Config));

// API Routes
app.use('/vragenlijst', vragenlijstRoutes)

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
export default app