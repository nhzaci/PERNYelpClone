const Router = require('express-promise-router');
const router = new Router();

const db = require('../../../db/index');

module.exports = router;

const successObject = (length, data) => ({
  success: true,
  length,
  data: data,
});

// get all
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(`
    SELECT 
      * 
    FROM 
      restaurants
    `);
    res.status(200).json(successObject(rows.length, { restaurants: rows }));
  } catch (err) {
    console.log({ err });
  }
});

// create new
router.post('/', async (req, res) => {
  const { name, location, price_range } = req.body;
  try {
    const { rows } = await db.query(
      `INSERT INTO 
        restaurants (name, location, price_range) 
      VALUES 
        ($1, $2, $3)
      RETURNING
        *`,
      [name, location, price_range]
    );
    res.status(201).json(successObject(rows.length, { restaurant: rows[0] }));
  } catch (err) {
    console.log({ err });
  }
});

// get one
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      `
  SELECT 
    * 
  FROM 
    restaurants 
  WHERE 
    id = $1`,
      [id]
    );
    res.status(200).json(successObject(rows.length, { restaurant: rows[0] }));
  } catch (err) {
    console.log({ err });
  }
});

// update one
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, location, price_range } = req.body;
  try {
    const { rows } = await db.query(
      `
    UPDATE 
      restaurants
    SET 
      name = $2,
      location = $3,
      price_range = $4
    WHERE
      id = $1
    RETURNING 
      *`,
      [id, name, location, price_range]
    );
    res.status(200).json(successObject(rows.length, { restaurant: rows[0] }));
  } catch (err) {
    console.log({ err });
  }
});

// delete one
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      `
    DELETE FROM
      restaurants
    WHERE
      id = $1`,
      [id]
    );
    res.status(200).json(successObject(rows.length, { restaurants: rows }));
  } catch (err) {
    console.log({ err });
  }
});
