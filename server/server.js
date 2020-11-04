'use strict'

const express = require('express');
const compression = require('compression');
const app = express();
const port = process.env.PORT || 3000;
const APP_FOLDER = __dirname + '/public';

app.use(compression());
app.use(express.static(APP_FOLDER));

app.get('/', (req, res) => res.redirect('turnapp'));

app.get('/turnapp/*', (req, res) => {
    const pathFolder = `${APP_FOLDER}/turnapp/index.html`;
    res.sendFile(pathFolder);
});


app.listen(port, () => console.log(`Deploy success!!!: ${port}`));