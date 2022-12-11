import connection from "../../database/db.js";
import dayjs from "dayjs";

export async function postRental(req, res) {
  try {
    const body = req.body;
    const date = getDate();
    const price = await connection.query(
      `SELECT "pricePerDay" FROM games WHERE id = $1`,
      [body.gameId]
    );
    const newRental = {
      ...body,
      rentDate: date,
      returnDate: null,
      originalPrice: `${price.rows[0].pricePerDay * body.daysRented}`,
      delayFee: null,
    };
    await connection.query(
      `INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        newRental.customerId,
        newRental.gameId,
        newRental.daysRented,
        newRental.rentDate,
        newRental.returnDate,
        newRental.originalPrice,
        newRental.delayFee,
      ]
    );
    return res.sendStatus(201);
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
