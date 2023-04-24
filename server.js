const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

//middleware to parse JSON requests
app.use(express.json());
//middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const { v4: uuidv4 } = require('uuid');

//route to return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

//route to return the index.html file
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//Define get route to read db.json file and return saved notes
app.get('/api/notes', (req, res) => {
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        res.json(JSON.parse(data));
    });
});

//Define the POST route to receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client:
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('db.json', JSON.stringify(notes), err => {
            if (err) {
                console.error(err);
                return res.status(500).end();
            }
            res.json(newNote);
        });
    });
});



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
