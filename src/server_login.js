const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors'); // Import the cors module

function server_login() {

const app = express();
const port = 3300;

app.use(cors()); // Enable CORS for all routes


app.use(bodyParser.json());

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Read user credentials from the JSON file
    fs.readFile('userCredentials.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
            return;
        }

        try {
            const users = JSON.parse(data);

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                res.json({ success: true, message: 'Login successful' });
            } else {
                res.status(401).json({ success: false, message: 'Invalid email or password' });
            }
        } catch (parseError) {
  
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening login `);
});

}
module.exports = server_login;
