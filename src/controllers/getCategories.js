import connection from "../database/db.js";

export async function getCategories(req, res) {
    try {
        const categories = await connection.query("SELECT * FROM categories;");
        return res.status(200).send(categories.rows);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}