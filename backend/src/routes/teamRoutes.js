import {checkJwt} from "../middleware/auth0.js";
import {updateTeam} from "../controllers/teamController.js";
import express from "express";

const router = express.Router()

router.patch("/:id", checkJwt, updateTeam)

export default router;