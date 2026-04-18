import {prisma} from '../config/db.js'

const updateAlgemeneInfo = async (req, res) => {
    const id = req.params.id
    const {telefoon_nummer, e_mail, adressen} = req.body
    const bestaandeIds = adressen.filter(a => a.id).map(a => a.id);
    // delete adressen not in list
    await prisma.adres.deleteMany({
        where: {
            praktijk_id: id,
            id: {notIn: bestaandeIds}
        }
    });
    //update or create the adressen
    for (const adres of adressen) {
        if (adres.id) {
            await prisma.adres.update({
                where: {id: adres.id},
                data: {huisnr: adres.huisnr, straat: adres.straat, Stad: adres.Stad, postcode: adres.postcode}
            })
        } else {
            await prisma.adres.create({
                data: {...adres, praktijk_id: id}
            })
        }
    }
    const result = await prisma.praktijk.update({
        where: {id: id},
        data: {telefoon_nummer: telefoon_nummer, e_mail: e_mail},
        include: {team: {include: {huisartsen: {include: {adres: true}}}}, adressen: true}
    })
    res.status(200).json({data: result})
}

const updateKenmerken = async (req, res) => {
    const id = req.params.id
    const result = await prisma.praktijk.update({
        where: {id: id},
        data: {...req.body},
        include: {team: {include: {huisartsen: {include: {adres: true}}}}, adressen: true}
    })
    res.status(200).json({result})
}

export {updateAlgemeneInfo, updateKenmerken}