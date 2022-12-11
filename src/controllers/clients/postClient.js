import connection from "../../database/db.js";

export async function postClient(req,res) {
    try{
        const newClient = req.body;
        await connection.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`, [newClient.name, newClient.phone, newClient.cpf, newClient.birthday]);
        return res.sendStatus(201);
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}