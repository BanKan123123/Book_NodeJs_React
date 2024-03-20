const express = require('express');
const cors = require('cors');
const path = require('path');
const route = require('./routers/router');

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/src/routers')));

route(app);

app.listen(4000, () => {
    console.log("Connecting to server... success");
});