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

const updateAntwoord = async (req, res) => {
    const {antwoorden, vooruitgang, praktijk_id, vragenlijst_id, id} = req.body;
    if (id) {
        await prisma.survey_antwoorden.update({
            where: {id: id},
            data: {antwoorden: antwoorden, vooruitgang: vooruitgang}
        })
    } else {
        await prisma.survey_antwoorden.create({
            data: {
                antwoorden: antwoorden,
                vooruitgang: vooruitgang,
                praktijk_id: praktijk_id,
                vragenlijst_id: vragenlijst_id
            }
        })
    }
    const newVragenlijsten = await prisma.vragenlijst.findMany({
        where: {
            surveyAntwoordens: {
                none: {
                    praktijk_id: praktijk_id,
                }
            }
        }
    });
    const a = await prisma.survey_antwoorden.findMany({
        where: {
            vooruitgang: {
                lt: 100
            }
        },
        include: {vragenlijst: true}
    })
    res.status(200).json({newVragenlijsten, antwoorden: a})
}

export {getVragenlijstenForPraktijk, updateAntwoord}