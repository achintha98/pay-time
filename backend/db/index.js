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

const AccountSchema = new mongoose.Schema({
    // Schema definition here
    userId: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
	balance: Number
});

const User = mongoose.model('User', UserSchema);
const Account = mongoose.model('Account', AccountSchema);

module.exports = {
    User,
    Account,
    DBConnect
}