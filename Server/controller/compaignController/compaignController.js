const Compaign = require("../../models/compaigns");

async function getCompaign() {
    try {
        const compaign = await Compaign.find();
        return compaign;
    } catch (error) {
        throw error;
    }
}

async function createCompaign(data) {
    try {
        const compaign = new Compaign(data);
        await compaign.save();
        return compaign;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getCompaign,
    createCompaign,
};