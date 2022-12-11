import connection from "../database/db.js";
import { newRentalSchema } from "../models/models.js";

export async function validateNewRental(req, res, next) {
  const validation = newRentalSchema.validate(req.body, { abortEarly: false });
  if (validation.error) {
    const errors = validation.error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  try {
    const customerId = req.body.customerId;
    const gameId = req.body.gameId;
    const checkCostumer = await connection.query(
      "SELECT * FROM customers WHERE id = $1;",
      [customerId]
    );
    if (checkCostumer.rows.length === 0) {
      return res.sendStatus(400);
    }
    const checkGame = await connection.query(
      "SELECT * FROM games WHERE id = $1;",
      [gameId]
    );
    if (checkGame.rows.length === 0) {
      return res.sendStatus(400);
    }
    const checkRentals = await connection.query(
      `SELECT * FROM rentals WHERE "gameId" = $1;`,
      [gameId]
    );
    if (checkRentals.rows.length === checkGame.stockTotal) {
      return res.sendStatus(400);
    }

    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
