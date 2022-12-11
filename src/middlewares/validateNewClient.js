import connection from "../database/db.js";
import { newClientSchema } from "../models/models.js";

export async function validateNewClient(req,res,next) {
    const validation = newClientSchema.validate(req.body, { abortEarly: false });
    if(validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(400).send(errors);
    }

    try{
        const newClient = req.body;
        const checkClient = await connection.query("SELECT * FROM customers WHERE cpf = $1", [newClient.cpf]);
        if(checkClient.rows.length!==0) {
            return res.sendStatus(409);
        }

        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}