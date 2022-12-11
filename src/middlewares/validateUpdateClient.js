import connection from "../database/db.js";
import { newClientSchema } from "../models/models.js";

export async function validateUpdateClient(req, res, next) {
  const validation = newClientSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const newClient = req.body;
    const id_params = Number(req.params.id);
    const checkID = await connection.query(
      "SELECT * FROM customers WHERE id = $1",
      [id_params]
    );
    if (checkID.rows.length === 0) {
      return res.sendStatus(404);
    }
    const checkClient = await connection.query(
      "SELECT * FROM customers WHERE cpf = $1",
      [newClient.cpf]
    );
    if (checkClient.rows.length !== 0) {
      const id_db = checkClient.rows[0].id;
      if (id_db !== id_params) {
        return res.sendStatus(409);
      }
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
