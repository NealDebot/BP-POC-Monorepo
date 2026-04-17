import express from "express";
import {checkJwt} from '../middleware/auth0.js'
import {updateAlgemeneInfo, updateKenmerken} from '../controllers/praktijkController.js'

const router = express.Router()

router.patch("/:id/algemeen", checkJwt, updateAlgemeneInfo)
router.patch("/:id/kenmerken", checkJwt, updateKenmerken)


export default router;