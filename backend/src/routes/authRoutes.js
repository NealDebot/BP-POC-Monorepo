import express from "express";
import {sync_user} from '../controllers/authController.js'
import {checkJwt} from '../middleware/auth0.js'

const router = express.Router()

router.post("/sync",checkJwt, sync_user)

export default router;