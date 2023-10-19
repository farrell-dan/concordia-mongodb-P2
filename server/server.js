const express = require('express');
const morgan = require('morgan');

const { batchImport } = require("./batchImport");
const { getSeats, bookSeat, updateUser } = require("./handlers")

const PORT = 5678;

var app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(require('./routes'));

app.get("/api/seat-availability", getSeats)
app.patch("/api/book-seat/:_id", bookSeat);

const server = app.listen(PORT, () => {
  console.info('🌍 Listening on port ' + server.address().port);
});
