import connection from "../../database/db.js";

export async function getGames(req, res) {
  try {
    const name = req.query.name;
    if (name) {
      const newString = `'${name}%'`;
      const results = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id WHERE games.name ILIKE ${newString};`
      );
      return res.status(200).send(results.rows);
    } else {
      const results = await connection.query(
        `SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id`
      );
      return res.status(200).send(results.rows);
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
