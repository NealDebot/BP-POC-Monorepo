import express from "express";
import {checkJwt} from '../middleware/auth0.js'
const router = express.Router();

router.get("/",checkJwt, (req, res) => {
    res.json(vragenlijsten)
})

const vragenlijsten = [
    {
        id: 0,
        surveyId: 0,
        title: 'jaarlijkste vragenlijst',
        deadline: new Date(),
        status: 0,
    },
    {
        id: 1,
        surveyId: 1,
        title: '3 jaarlijkste vragenlijst',
        deadline: new Date(),
        status: 80,
    },
];
export default router;