const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const userRouter = require("./routes/user");
const {DBConnect} = require("./db")
const cors = require('cors')

// Middleware for parsing request bodies
app.use(cors);
app.use(bodyParser.json());
app.use("/api/v1", userRouter)

const PORT = 3000;

app.listen(PORT, () => {
    DBConnect()
    console.log(`Server is running on port ${PORT}`);
});
