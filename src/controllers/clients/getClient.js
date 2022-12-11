import connection from "../../database/db.js";

export async function getClient(req, res) {
  try {
    const id = req.params.id;
    const results = await connection.query(
      `SELECT * FROM customers WHERE id = $1`,
      [id]
    );
    if (results.rows.length === 0) {
      return res.sendStatus(404);
    }
    return res.status(200).send(results.rows);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
