// Setting up a basic server using express
const express = require('express');
const app = express();

// run the server on port 3000
const port = 3000;

app.get('/hello', (req, res) => {
    // send a response to the client with the message "Hello, World!"
    res.send('Hello, World!');
});

// listen to the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});