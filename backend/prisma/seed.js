import "dotenv/config.js"
import {prisma} from "../src/config/db.js"

const jsonSurvey = {
    "title": "Jaarlijkse Toegankelijkheids Vragenlijst",
    "pages": [
        {
            "name": "Praktijk Informatie",
            "title": "Praktijk Informatie",
            "elements": [
                {
                    "type": "dropdown",
                    "name": "question1",
                    "title": "Wie vult deze praktijkfiche over de huisartsenpraktijk in?",
                    "isRequired": true,
                    "choices": [
                        {
                            "value": "Item 1",
                            "text": "Huisarts"
                        },
                        {
                            "value": "Item 2",
                            "text": "Haio"
                        },
                        {
                            "value": "Item 3",
                            "text": "Praktijkverpleegkundige"
                        },
                        {
                            "value": "Item 4",
                            "text": "Administratief medewerker"
                        },
                        {
                            "value": "Item 5",
                            "text": "Vragenlijst is in team ingevuld"
                        },
                        {
                            "value": "Item 6",
                            "text": "Andere"
                        }
                    ],
                    "allowCustomChoices": true
                },
                {
                    "type": "text",
                    "name": "question2",
                    "title": "Hoevel patiënten met een globaal medisch dossier (GMD) telt deze praktijk?",
                    "isRequired": true,
                    "visibleIf": "{betalingssysteem} = 'Per prestatie'",
                    "inputType": "number"
                },
                {
                    "type": "text",
                    "name": "question3",
                    "title": "Hoeveel patiënten zijn er ingeschreven in deze praktijk?",
                    "isRequired": true,
                    "visibleIf": "{betalingssysteem} = 'Forfaitair'",
                    "inputType": "number"
                }
            ]
        },
        {
            "name": "page1",
            "title": "Verhogen capaciteit",
            "description": "We krijgen graag zicht op de toekomstplannen van de praktijk in verband met een eventuele uitbreiding.",
            "elements": [
                {
                    "type": "matrix",
                    "name": "question4",
                    "title": "Is er in de praktijk momenteel een vacature voor",
                    "isRequired": true,
                    "columns": [
                        {
                            "value": "Column 1",
                            "text": "Geen vacature"
                        },
                        {
                            "value": "Column 2",
                            "text": "Ja, deeltijds"
                        },
                        {
                            "value": "Column 3",
                            "text": "Ja, voltijds"
                        }
                    ],
                    "rows": [
                        {
                            "value": "Row 1",
                            "text": "Huisarts"
                        },
                        {
                            "value": "Row 2",
                            "text": "Haio"
                        },
                        {
                            "value": "Row 3",
                            "text": "Verpleegkundige"
                        },
                        {
                            "value": "Row 4",
                            "text": "andere discipline"
                        }
                    ]
                },
                {
                    "type": "boolean",
                    "name": "question5",
                    "title": "Zijn in de voorbije 2 jaar aanpassingen uitgevoerd aan het praktijkgebouw met als doel meer patiënten te kunnen zien?",
                    "isRequired": true,
                    "labelTrue": "Ja",
                    "labelFalse": "Neen",
                    "swapOrder": true
                },
                {
                    "type": "boolean",
                    "name": "question6",
                    "visibleIf": "{question5} = false",
                    "title": "Heeft de praktijk in de voorbije 2 jaar overwogen om aanpassingen uit te voeren aan het praktijkgebouw?",
                    "isRequired": true,
                    "labelTrue": "Ja",
                    "labelFalse": "Neen",
                    "swapOrder": true
                },
                {
                    "type": "tagbox",
                    "name": "question7",
                    "visibleIf": "{question6} = true",
                    "title": "Waarom werden deze aanpassingen niet doorgevoerd?",
                    "choices": [
                        {
                            "value": "Item 1",
                            "text": "Het gebouw is in die mate ongeschikt dat de inspanning die dit zou vragen niet in balans zou zijn met de baten."
                        },
                        {
                            "value": "Item 2",
                            "text": "Omwille van beperkingen opgelegd door de eigenaar van het praktijkgebouw."
                        },
                        {
                            "value": "Item 3",
                            "text": "Omwille van beperkingen opgelegd door de gemeente/sad/stedenbouw."
                        },
                        {
                            "value": "Item 4",
                            "text": "Omwille van financiële redenen."
                        },
                        {
                            "value": "Item 5",
                            "text": "Omwille van onvoldoende kennis om een bouwproject te starten."
                        },
                        {
                            "value": "Item 6",
                            "text": "Omwille van onvoldoende tijd."
                        },
                        {
                            "value": "Item 7",
                            "text": "Omwille van andere redenen"
                        }
                    ]
                }
            ]
        },
        {
            "name": "page2",
            "title": "Andere genomen maatregelen",
            "description": "Mogelijks ondernam uw praktijk al maatregelen om een tekort aan capaciteit te ondervangen of plant dit te doen. Geef voor elk van onderstaande maatregelen aan of de praktijk dit al heeft gedaan of van plan is om te doen.",
            "elements": [
                {
                    "type": "matrix",
                    "name": "andere genomen maatregelen",
                    "title": "Maatregelen omtrent personeel",
                    "isRequired": true,
                    "columns": [
                        {
                            "value": "Column 1",
                            "text": "Dit doen we al of hebben we al gedaan"
                        },
                        {
                            "value": "Column 2",
                            "text": "Dit zijn we van plan binnen de komende zes maanden"
                        },
                        {
                            "value": "Column 3",
                            "text": "Dit doen we niet en zijn we niet van plan komende zes maanden"
                        },
                        {
                            "value": "Column 4",
                            "text": "Niet van toepassing"
                        }
                    ],
                    "rows": [
                        {
                            "value": "Row 1",
                            "text": "Herschikking van taken naar een verpleegkundige"
                        },
                        {
                            "value": "Row 2",
                            "text": "Herschikking van taken naar een administratief medewerker"
                        },
                        {
                            "value": "Row 3",
                            "text": "Het bijscholen van bestaand personeel waardoor taakherschikking mogelijk is"
                        }
                    ]
                },
                {
                    "type": "matrix",
                    "name": "question8",
                    "title": "Maatregelen omtrent organisatie praktijk",
                    "isRequired": true,
                    "columns": [
                        {
                            "value": "Column 1",
                            "text": "Dit doen we al of hebben we al gedaan"
                        },
                        {
                            "value": "Column 2",
                            "text": "Dit zijn we van plan binnen de komende zes maanden"
                        },
                        {
                            "value": "Column 3",
                            "text": "Dit doen we niet en zijn we niet van plan komende zes maanden"
                        },
                        {
                            "value": "Column 4",
                            "text": "Niet van toepassing"
                        }
                    ],
                    "rows": [
                        {
                            "value": "Row 1",
                            "text": "Het efficiënter organiseren van de praktijk"
                        },
                        {
                            "value": "Row 2",
                            "text": "Afbouwen van huisbezoeken"
                        },
                        {
                            "value": "Row 3",
                            "text": "Uitbreiden van de openingsuren van de praktijk"
                        },
                        {
                            "value": "Row 4",
                            "text": "Verkorten van de duur van een consultatie of huisbezoek"
                        },
                        {
                            "value": "Row 5",
                            "text": "Patiënten met chronische aandoeningen meer stimuleren tot zelfzorg/ zelfmanagement"
                        },
                        {
                            "value": "Row 6",
                            "text": "Groepssessies organiseren in plaats van individuele consultaties vb. voor diabetespatiënten"
                        },
                        {
                            "value": "Row 7",
                            "text": "Toepassen van eHelth mogelijkheden vb. videoconsultaties"
                        }
                    ]
                },
                {
                    "type": "matrix",
                    "name": "question9",
                    "title": "Maatregelen omtrent samenwerking",
                    "isRequired": true,
                    "columns": [
                        {
                            "value": "Column 1",
                            "text": "Dit doen we al of hebben we al gedaan"
                        },
                        {
                            "value": "Column 2",
                            "text": "Dit zijn we van plan binnen de komende zes maanden"
                        },
                        {
                            "value": "Column 3",
                            "text": "Dit doen we niet en zijn we niet van plan komende zes maanden"
                        },
                        {
                            "value": "Column 4",
                            "text": "Niet van toepassing"
                        }
                    ],
                    "rows": [
                        {
                            "value": "Row 1",
                            "text": "Meer samenwerken met andere huisartspraktijken"
                        },
                        {
                            "value": "Row 2",
                            "text": "Meer samenwerken met andere medische zorgverleners van buiten de praktijk"
                        },
                        {
                            "value": "Row 3",
                            "text": "Meer samenwerking met andere organisaties in de regio"
                        }
                    ]
                }
            ]
        }
    ],
    "questionErrorLocation": "bottom",
    "showProgressBar": true,
    "progressBarType": "questions",
    "headerView": "advanced"
}

const main = async () => {
    console.log("Seeding vragenlijst...")
    const survey = JSON.stringify(jsonSurvey)
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    await prisma.vragenlijst.create({
        data: {
            json: survey,
            naam: "Jaarlijkse vragenlijst",
            deadline: date
        }
    })
    console.log("Seeding completed!")
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect()
})
