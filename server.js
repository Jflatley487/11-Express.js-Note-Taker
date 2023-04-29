
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Parse URL encoded & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Host public folder
app.use(express.static('public'));

// Use apiRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});












/*const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 3001;

//middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

const { v4: uuidv4 } = require('uuid');

//route to return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

//route to return the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//Define get route to read notes.json file and return saved notes
app.get('/notes', (req, res) => {
    fs.readFile('db/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

//Define the POST route to receive a new note to save on the request body, add it to the notes.json file, and then return the new note to the client:
app.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile('db/notes.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).end();
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('db/notes.json', JSON.stringify(notes), err => {
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
});*/
