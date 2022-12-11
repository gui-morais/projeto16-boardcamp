import connection from "../../database/db.js";

export async function putClient(req, res) {
  try {
    const newClient = req.body;
    const id = req.params.id;
    await connection.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;`,
      [newClient.name, newClient.phone, newClient.cpf, newClient.birthday, id]
    );
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
