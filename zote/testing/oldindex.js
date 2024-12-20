const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sayhi = require('../zote/testing/testdata');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Welcome to Grandelo');
});

app.get('/name', (req, res) => {
  res.send(sayhi());
});

app.post('/thankyou', (req, res) => {
  const { name } = req.body;
  if (name) {
    res.json({ message: `Thank you, ${name}. It a great pleasue having you in this app.` });
  } else {
    res.status(400).json({ message: 'Name is required' });
  }
});

app.post('/morethankyou', (req, res) => {
  const { name1, name2, name3 } = req.body; 
  if (name1 && name2 && name3) {
    res.json({ message: `Thank you, ${name1}, ${name2}, and ${name3}` }); 
  } else {
    res.status(400).json({ message: 'All three names are required' }); 
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
