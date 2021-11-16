const express = require('express');

const fs = require('fs');

const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();



// routes

app.get('/', (rep, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get("/api/notes", function (req, res) {
    fs.readFile("db/db.json", "utf8", function (err, notes) {
        if (err) {
            console.log(err)
            return
        }
        res.json(JSON.parse(notes));
    })
});

app.listen(PORT, () => {
    console.log('API server now live at http;//localhost:${PORT}!');
});