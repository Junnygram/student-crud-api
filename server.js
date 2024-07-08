const express = require('express');
const studentRoutes = require('./routes/studentRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(studentRoutes);

app.listen(port,'0.0.0.0' () => {
  console.log(`Server is running on port ${port}`);
});
