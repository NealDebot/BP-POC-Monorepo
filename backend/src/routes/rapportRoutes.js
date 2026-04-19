import express from "express";
import {checkJwt} from "../middleware/auth0.js";
import {getRapports} from "../controllers/rapportController.js";

const router = express.Router();

router.get("/:praktijk_id", checkJwt, getRapports)

export default router