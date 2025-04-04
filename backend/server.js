const express = require('express');
const app = require('./app');

const PORT = 7474;

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});