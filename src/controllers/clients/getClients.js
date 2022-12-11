import connection from "../../database/db.js";

export async function getClients(req, res) {
  try {
    const cpf = req.query.cpf;
    if (cpf) {
      const newString = `'${cpf}%'`;
      const results = await connection.query(
        `SELECT * FROM customers WHERE cpf ILIKE ${newString};`
      );
      return res.status(200).send(results.rows);
    } else {
      const results = await connection.query(`SELECT * FROM customers;`);
      return res.status(200).send(results.rows);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
