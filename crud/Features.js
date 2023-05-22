const express=require ('express');
const connection=require('../connection');
const router = express.Router();

app.get('/list', (req, res,next) => {
    const query = 'SELECT * FROM jobs';
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(200).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });