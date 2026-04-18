import {prisma} from '../config/db.js'

const getVragenlijstenForPraktijk = async (req, res) => {
    const praktijkId = req.params.praktijkId
    const newVragenlijsten = await prisma.vragenlijst.findMany({
        where: {
            surveyAntwoordens: {
                none: {
                    praktijk_id: praktijkId,
                }
            }
        }
    });
    const antwoorden = await prisma.survey_antwoorden.findMany({
        where: {
            vooruitgang: {
                lt: 100
            }
        },
        include: {vragenlijst: true}
    })
    res.status(200).json({newVragenlijsten, antwoorden})
}

export {getVragenlijstenForPraktijk}