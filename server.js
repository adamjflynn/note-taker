// modules

const express = require('express');

const fs = require('fs');

const path = require('path');

// port

const PORT = process.env.PORT || 3002;

// server

const app = express();

app.use(express.urlencoded ( { extended: true}));
app.use(express.json());
app.use(express.static('public'));


// routes

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
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

// function to post data to json

app.post("/api/notes", function (req, res) {
    const newNote = req.body
    let notesDB = []
    fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        if (data === "") { // if starting from an empty json file
            notesDB.push({ "id": 1, "title": newNote.title, "text": newNote.text });
        } else {
            notesDB = JSON.parse(data);
            notesDB.push({ "id": notesDB.length + 1, "title": newNote.title, "text": newNote.text });
        }
        // updated notes pushed to db.json
        fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(notesDB), function (error) {
            if (error) { return console.log(error); }
            res.json(notesDB);
        });
    });
  });

app.listen(PORT, () => {
    console.log(`API server now live at ${PORT}!`);
});