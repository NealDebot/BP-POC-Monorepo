import "dotenv/config";
import express from 'express'
import {disconnectDB, connectDB} from './config/db.js'
import cors from 'cors'
//import Routes
import vragenlijstRoutes from './routes/vragenlijstRoutes.js'
import authRoutes from './routes/authRoutes.js'
import praktijkRoutes from './routes/praktijkRoutes.js'
import teamRoutes from './routes/teamRoutes.js'
import raportRoutes from './routes/rapportRoutes.js'

connectDB()

const app = express();
app.use(cors({
    origin: ['http://localhost:4200'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}))

app.options(/.*/, cors());

// parsing middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));


// API Routes
app.use('/vragenlijst', vragenlijstRoutes)
app.use('/auth', authRoutes)
app.use('/praktijk', praktijkRoutes)
app.use('/team', teamRoutes)
app.use('/rapport',raportRoutes)

export default app