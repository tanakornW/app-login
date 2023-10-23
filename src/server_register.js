const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the cors module

function server_register() {

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const newUser = req.body;

    // Read the existing JSON data from the file
    const jsonData = JSON.parse(fs.readFileSync('userCredentials.json', 'utf8'));

    const isDuplicate = jsonData.some(user => user.email === newUser.email);

    if (isDuplicate) {
        res.status(400).json({ message: 'Error: Duplicate email found. User not added.' });
    } else {
        jsonData.push(newUser);

        const updatedData = JSON.stringify(jsonData, null, 2);

        fs.writeFileSync('userCredentials.json', updatedData, 'utf8');

        res.json({ message: 'New user added successfully!' });
    }
});

app.listen(port, () => {
    console.log(`Server listening Register `);
});

}
module.exports = server_register;