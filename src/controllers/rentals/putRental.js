import connection from "../../database/db.js";
import dayjs from "dayjs";

export async function putRental(req, res) {
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
    if (rentalInfos.returnDate !== null) {
      return res.sendStatus(400);
    }

    const returnDate = getDate();
    rentalInfos.returnDate = returnDate;
    const date1 = new Date(returnDate);
    const date2 = new Date(rentalInfos.rentDate);
    let daysLate = Math.floor(
      (date1.getTime() + 3 * 3600 * 1000 - date2.getTime()) / (24 * 3600 * 1000)
    );
    if (daysLate < 0) {
      daysLate = 0;
    }
    const gamePrice = await connection.query(
      `SELECT "pricePerDay" FROM games WHERE id = $1`,
      [rentalInfos.gameId]
    );
    const delayFee = gamePrice.rows[0].pricePerDay * daysLate;

    await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3`,
      [returnDate, delayFee, id]
    );

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

function getDate() {
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const day = dayjs().date();

  let currentDate = "";
  currentDate += year + "-";
  if (month < 10) {
    currentDate += "0";
  }
  currentDate += month + "-";
  if (day < 10) {
    currentDate += "0";
  }
  currentDate += day;
  return currentDate;
}
