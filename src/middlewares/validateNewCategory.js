import connection from "../database/db.js";
import { newCategorySchema } from "../models/models.js";

export async function validateNewCategory(req, res, next) {
    const validation = newCategorySchema.validate(req.body);
    if(validation.error) {
        return res.status(400).send(validation.error.details[0].message);
    }

    try {
        const {name} = req.body;
        const repetition = await connection.query(`SELECT * FROM categories WHERE name=$1;`, [name]);
        if(repetition.rows.length!==0) {
            return res.sendStatus(409);
        }

        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}