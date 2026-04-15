import {prisma} from '../config/db.js'

const sync_user = async (req, res) => {
    const {auth0_id} = req.body

    //check if user already exists
    const praktijk = await prisma.praktijk.findUnique({
        where: {auth0_id: auth0_id}
    });
    //if user doesn't exist add create the user
    if (!praktijk) {
        const newPraktijk = await prisma.praktijk.create({
            data: {
                auth0_id
            }
        });
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