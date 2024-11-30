const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true, 
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
});


formSchema.pre('save', async function(next) {
    if (!this.username) {
        this.username = generateUsername();
    }
    next();
});

function generateUsername() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = Math.floor(100000 + Math.random() * 900000); 
    const randomLetters = letters.charAt(Math.floor(Math.random() * letters.length)) +
                          letters.charAt(Math.floor(Math.random() * letters.length)); 
    return randomLetters + numbers;
}

module.exports = mongoose.model("User", formSchema);
