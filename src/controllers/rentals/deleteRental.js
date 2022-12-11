import connection from "../../database/db.js";

export async function deleteRental(req, res) {
  try {
    const id = req.params.id;
    const rental = await connection.query(
      `SELECT * FROM rentals WHERE id = $1`,
      [id]
    );
    if (rental.rows.length === 0) {
      return res.sendStatus(404);
    }
    const rentalInfos = rental.rows[0];
    if (rentalInfos.returnDate === null) {
      return res.sendStatus(400);
    }
    await connection.query(`DELETE FROM rentals WHERE id = $1`, [id]);
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
