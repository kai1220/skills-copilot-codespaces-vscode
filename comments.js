// create web server
const express = require('express');
const app = express();
const port = 3000;

// create a router
const router = express.Router();

// use the router
app.use(router);

// create a route
router.get('/', (req, res) => {
    res.send('Hello World!');
});

// create another route
router.get('/comments', (req, res) => {
    res.send('Comments');
});

// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});