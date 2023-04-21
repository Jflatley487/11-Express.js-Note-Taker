app.use(express.json());

const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const app = express();

const { v4: uuidv4 } = require('uuid');

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
    newNote.id = uuid.v4();
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

//route to return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

//route to return the index.html file
app.get('*', (req, res) => {
    res.sendFile(--dirname + '/public/index.html');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});