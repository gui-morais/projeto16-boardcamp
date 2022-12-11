import connection from "../../database/db.js";

export async function getRentals(req,res) {
    try {
        const { customerId, gameId } = req.query;

        let results;
        if (customerId && gameId) {
            results = await connection.query(`SELECT * FROM rentals WHERE "customerId" = $1 AND "gameId" = $2;`, [customerId, gameId]);
        } else if(customerId && !gameId) {
            results = await connection.query(`SELECT * FROM rentals WHERE "customerId" = $1;`, [customerId]);
        } else if(!customerId && gameId) {
            results = await connection.query(`SELECT * FROM rentals WHERE "gameId" = $1;`, [gameId]);
        } else {
            results = await connection.query(`SELECT * FROM rentals;`);
        }

        const arrayResults = [];
        for (let i=0; i<results.rows.length; i++) {
            const e = results.rows[i];
            const customer = await connection.query(`SELECT id, name FROM customers WHERE id = $1`, [e.customerId]);
            e.customer = customer.rows[0];
            const game = await connection.query(`SELECT games.id, games.name, games."categoryId", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1`, [e.gameId]);
            e.game = game.rows[0];
            arrayResults.push(e);
        }
        
        return res.status(200).send(arrayResults);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}