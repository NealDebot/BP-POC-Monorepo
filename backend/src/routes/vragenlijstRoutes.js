import express from "express";
import {checkJwt} from '../middleware/auth0.js'
import {getVragenlijstenForPraktijk, updateAntwoord} from '../controllers/vragenlijstController.js'

const router = express.Router();

router.get("/:praktijkId", checkJwt, getVragenlijstenForPraktijk)

router.put("/", checkJwt, updateAntwoord)

export default router;