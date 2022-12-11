import connection from "../database/db.js";
import { newGameSchema } from "../models/models.js";

export async function validateNewGame(req, res, next) {
  const validation = newGameSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const newGame = req.body;
    const checkCategory = await connection.query(
      `SELECT * FROM categories WHERE id = $1`,
      [newGame.categoryId]
    );
    if (checkCategory.rows.length === 0) {
      return res.sendStatus(400);
    }

    const checkName = await connection.query(
      `SELECT * FROM games WHERE name = $1`,
      [newGame.name]
    );
    if (checkName.rows.length !== 0) {
      return res.sendStatus(409);
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
