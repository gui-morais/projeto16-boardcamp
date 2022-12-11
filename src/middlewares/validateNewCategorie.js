import connection from "../database/db.js";

export async function validateNewCategorie(req, res, next) {
    const {name} = req.body;
    if(name===null || name.length===0) {
        return res.sendStatus(400);
    }
    try {
        const repetition = await connection.query("SELECT * FROM categories WHERE name=$1;", [name]);
        if(repetition.rows.length!==0) {
            return res.sendStatus(409);
        }
        
        next();
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }
}