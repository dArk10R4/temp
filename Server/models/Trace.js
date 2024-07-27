const mongoose = require('mongoose');

const traceSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
});

const Trace = mongoose.model('Trace', traceSchema);

module.exports = Trace;

