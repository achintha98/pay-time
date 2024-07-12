const mongoose = require('mongoose');

// Connect to MongoDB
const DBConnect = () => {mongoose.connect("mongodb+srv://admin2:admin2@cluster0.xavy1kq.mongodb.net/paytm")};

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    firstname: String,
    lastname: String
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User,
    DBConnect
}