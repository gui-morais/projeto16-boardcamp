import connection from "../../database/db.js";

export async function postGame(req,res) {
    try {
        const newGame = req.body;
        await connection.query(`INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);`, [newGame.name, newGame.image, newGame.stockTotal, newGame.categoryId, newGame.pricePerDay]);
        return res.sendStatus(201);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}