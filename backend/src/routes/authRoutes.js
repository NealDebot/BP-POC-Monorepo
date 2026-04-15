import express from "express";
import {sync_user} from '../controllers/authController.js'

const router = express.Router()

router.post("/sync", sync_user)

export default router;