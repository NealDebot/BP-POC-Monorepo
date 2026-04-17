import express from "express";
import {checkJwt} from '../middleware/auth0.js'
import {updateAlgemeneInfo} from '../controllers/praktijkController.js'

const router = express.Router()

router.patch("/:id/algemeen", checkJwt, updateAlgemeneInfo)


export default router;