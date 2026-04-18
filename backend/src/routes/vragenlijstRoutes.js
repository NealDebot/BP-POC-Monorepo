import express from "express";
import {checkJwt} from '../middleware/auth0.js'
import {getVragenlijstenForPraktijk} from '../controllers/vragenlijstController.js'
const router = express.Router();

router.get("/:praktijkId",checkJwt, getVragenlijstenForPraktijk)

export default router;