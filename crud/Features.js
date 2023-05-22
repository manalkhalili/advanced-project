const app = express();
app.use(bodyParser.json());

app.get('/list', (req, res,next) => {
    const query = 'SELECT * FROM jobs';
    pool.query(query, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(results);
      }
    });
  });
  
  /*app.post('/jobs', (req, res) => {
    const { title, abouttherole, requirements, salary } = req.body;
    const query = `INSERT INTO jobs (title, abouttherole, requirements, salary) VALUES (?, ?, ?, ?)`;
    const values = [title, abouttherole, requirements, salary];
    pool.query(query, values, (error, result) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json({ id: result.insertId, ...req.body });
      }
    });
  });*/
  
  


