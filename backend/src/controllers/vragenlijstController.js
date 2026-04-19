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
        if (vooruitgang === 100) {
            await generateRapport(id)
        }
        await prisma.survey_antwoorden.update({
            where: {id: id},
            data: {antwoorden: antwoorden, vooruitgang: vooruitgang}
        })
    } else {
        const newAntwoord = await prisma.survey_antwoorden.create({
            data: {
                antwoorden: antwoorden,
                vooruitgang: vooruitgang,
                praktijk_id: praktijk_id,
                vragenlijst_id: vragenlijst_id
            }
        })
        if (vooruitgang === 100) {
            await generateRapport(newAntwoord.id)
        }
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

const generateRapport = async (antwoordId) => {
    console.log("Generating raport...")
    await prisma.rapport.create({
        data: {
            titel: "Toegankelijkheids rapport",
            samenvatting: "De vragenlijst toont aan dat er binnen de praktijk nog kansen liggen om de toegankelijkheid en efficiëntie van de zorg te verbeteren. Door gerichte stappen te zetten, zoals het optimaliseren van digitale tools, het versterken van samenwerking en het inzetten van ondersteunend personeel, kan de werkdruk beter verdeeld worden en de patiëntenzorg vlotter verlopen.\n" +
                "\n" +
                "Belangrijke aandachtspunten zijn onder andere het verbeteren van de bereikbaarheid (telefonisch en online), het verminderen van administratieve belasting voor zorgverleners en het verkorten van wachttijden voor patiënten. Daarnaast kan het uitwerken van duidelijke afspraken, protocollen en samenwerkingen bijdragen aan een meer gestructureerde werking.\n" +
                "\n" +
                "Door stapsgewijs te evolueren naar een efficiëntere organisatie, kan zowel de tevredenheid van patiënten als het welzijn van zorgverleners verhoogd worden.",
            Uitleg: "De vragenlijst toont aan dat er binnen de praktijk nog kansen liggen om de toegankelijkheid en efficiëntie van de zorg te verbeteren. Door gerichte stappen te zetten, zoals het optimaliseren van digitale tools, het versterken van samenwerking en het inzetten van ondersteunend personeel, kan de werkdruk beter verdeeld worden en de patiëntenzorg vlotter verlopen.\n" +
                "\n" +
                "Belangrijke aandachtspunten zijn onder andere het verbeteren van de bereikbaarheid (telefonisch en online), het verminderen van administratieve belasting voor zorgverleners en het verkorten van wachttijden voor patiënten. Daarnaast kan het uitwerken van duidelijke afspraken, protocollen en samenwerkingen bijdragen aan een meer gestructureerde werking.\n" +
                "\n" +
                "Door stapsgewijs te evolueren naar een efficiëntere organisatie, kan zowel de tevredenheid van patiënten als het welzijn van zorgverleners verhoogd worden.\n" +
                "\n" +
                "Uitgebreide uitleg\n" +
                "\n" +
                "Op basis van de ingevulde vragenlijst wordt duidelijk dat de praktijk zich in een ontwikkelingsfase bevindt op vlak van efficiëntie en toegankelijkheid. Er zijn reeds bepaalde fundamenten aanwezig, maar er bestaan nog meerdere opportuniteiten om processen verder te optimaliseren.\n" +
                "\n" +
                "Een eerste belangrijk domein is de organisatie en digitalisering van de praktijkwerking. Het gebruik van een website met duidelijke informatie en een online agendasysteem kan de instroom van patiënten beter sturen en het aantal telefonische contacten verminderen. Transparante communicatie rond afspraken, openingsuren en procedures helpt om verwachtingen van patiënten beter te managen.\n" +
                "\n" +
                "Daarnaast speelt samenwerking een cruciale rol. Het uitbouwen van een netwerk met andere zorgverleners en praktijken kan ondersteuning bieden bij piekmomenten, vakantieperiodes of specifieke zorgvragen. Ook samenwerking met externe partners zoals thuisverpleegkundigen kan bijdragen aan een efficiëntere zorgverlening.\n" +
                "\n" +
                "Een ander belangrijk aspect is de inzet van ondersteunend personeel. Het delegeren van administratieve en bepaalde medische taken aan praktijkassistenten of verpleegkundigen kan de werklast van artsen aanzienlijk verlagen. Dit zorgt ervoor dat zij zich meer kunnen focussen op hun kerntaken en kwalitatieve patiëntenzorg.\n" +
                "\n" +
                "Verder is er nood aan duidelijke afspraken en protocollen binnen de praktijk. Het vastleggen van richtlijnen rond werkverdeling, communicatie en zorgprocessen zorgt voor meer structuur en consistentie. Dit komt niet alleen de interne werking ten goede, maar verhoogt ook de kwaliteit en veiligheid van de zorg.\n" +
                "\n" +
                "Tot slot kunnen monitoring en evaluatie via indicatoren zoals wachttijden, patiëntentevredenheid en werkdruk helpen om gerichte verbeteracties op te volgen. Door regelmatig stil te staan bij deze gegevens, kan de praktijk blijven evolueren en inspelen op veranderende noden.\n" +
                "\n" +
                "Door deze elementen stapsgewijs te implementeren, kan een praktijk groeien naar een meer efficiënte, toegankelijke en toekomstgerichte organisatie.",
            survey_antwoord_id: antwoordId
        }
    })
}

export {getVragenlijstenForPraktijk, updateAntwoord}