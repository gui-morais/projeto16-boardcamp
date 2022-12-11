import connection from "../../database/db.js";

export async function postCategory(req, res) {
    try {
        const {name} = req.body;
        await connection.query(`INSERT INTO categories (name) VALUES ($1);`, [name]);
        return res.sendStatus(201);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}