import {prisma} from '../config/db.js'

const sync_user = async (req, res) => {
    const {auth0_id} = req.body

    const praktijk = await prisma.praktijk.findUnique({
        where: {auth0_id: auth0_id},
        include: {team: {include: {huisartsen: true}}, adressen: true}
    });

    if (!praktijk) {
        const newPraktijk = await prisma.$transaction(async (tx) => {
            const team = await tx.team.create({})
            return tx.praktijk.create({
                data: {
                    auth0_id,
                    team_id: team.id
                },
                include: {team: {include: {huisartsen: true}}, adressen: true}
            });
        })
        res.status(201).json({
            status: "succes",
            data: {
                praktijk: newPraktijk
            }
        })
    } else {
        res.status(200).json({
            status: "succes",
            data: {
                praktijk: praktijk
            }
        })
    }
}

export {sync_user}