const express = require('express');
const routes = require('./routes/routes.js');
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});

module.exports = app;