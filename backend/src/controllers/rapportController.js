import {prisma} from '../config/db.js'

const getRapports = async (req, res) => {
    const praktijkId = req.params.praktijk_id
    const result = await prisma.rapport.findMany({
        where:{survey_antwoord:{praktijk_id: praktijkId}}
    })
    res.status(200).json(result)
}

export {getRapports}