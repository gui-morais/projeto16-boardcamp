import connection from "../database/db.js";
import { newCategorieSchema } from "../models/models.js";

export async function validateNewCategorie(req, res, next) {
    const validation = newCategorieSchema.validate(req.body);
    if(validation.error) {
        return res.sendStatus(400);
    }

    try {
        const {name} = req.body;
        const repetition = await connection.query("SELECT * FROM categories WHERE name=$1;", [name]);
        if(repetition.rows.length!==0) {
            return res.sendStatus(409);
        }

        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}