import {prisma} from '../config/db.js'

const updateTeam = async (req, res) => {
    const id = parseInt(req.params.id)
    console.log(req.body)
    const {
        huisartsen,
        andere,
        gezondheidspromoter,
        psycholoog,
        podoloog,
        sociaal_werker,
        kinesitherapeut_manueeltherapeut_osteopaat,
        dietist_voedingsdeskundige,
        verpleegkundige,
        onthaal_administratief,
        coordinator_directeur,
    } = req.body

    const bestaandeIds = huisartsen.filter(h => h.id).map(h => h.id);
    // delete huisartsen not in list
    await prisma.huisarts.deleteMany({
        where: {
            id: {notIn: bestaandeIds}
        }
    });

    for (const huisarts of huisartsen) {
        if (huisarts.id) {
            await prisma.huisarts.update({
                where: {id: huisarts.id},
                data: {
                    adres_id: parseInt(huisarts.adres),
                    email: huisarts.email,
                    geboortejaar: huisarts.geboortejaar,
                    rizivnr: huisarts.rizivnr,
                    in_opleiding: huisarts.in_opleiding,
                    stopzetten: huisarts.stopzetten
                }
            })
        } else {
            await prisma.huisarts.create({
                data: {
                    adres_id: parseInt(huisarts.adres),
                    email: huisarts.email,
                    geboortejaar: huisarts.geboortejaar,
                    rizivnr: huisarts.rizivnr,
                    in_opleiding: huisarts.in_opleiding,
                    stopzetten: huisarts.stopzetten,
                    team_id: id
                }
            })
        }
    }

    await prisma.team.update({
        where: {id: id},
        data: {
            andere,
            gezondheidspromoter,
            psycholoog,
            podoloog,
            sociaal_werker,
            kinesitherapeut_manueeltherapeut_osteopaat,
            dietist_voedingsdeskundige,
            verpleegkundige,
            onthaal_administratief,
            coordinator_directeur,
        }
    })

    const result = await prisma.praktijk.findFirst({
        where:{team_id: id},
        include: {team: {include: {huisartsen: {include: {adres: true}}}}, adressen: true}
    })
    res.status(200).json({result})
}

export {updateTeam}