const mongoose = require("mongoose");

const compaignSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
    users: {
        type: [mongoose.Schema.ObjectId],
    },
    
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
}
);

const Compaign = mongoose.model("Compaign", compaignSchema);

module.exports = Compaign;