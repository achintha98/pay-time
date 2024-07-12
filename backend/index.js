const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {router} = require("./routes/user");
const {DBConnect} = require("./db")
const cors = require('cors')

DBConnect()

// Middleware for parsing request bodies
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
