const Compaign = require("../../models/compaigns");
const {uuid} = require('uuidv4');
const Trace = require("../../models/Trace");
const main = require('../../helper/sendVirus');

async function getCompaign() {
    try {
        const compaign = await Compaign.find();
        return compaign;
    } catch (error) {
        throw error;
    }
}

async function createCompaign(req, res) {
    try {
        console.log(res.body);
        console.log("is the compaign");
        const token = uuid() + uuid();
        main({
            "to-email": "goylerov04@gmail.com",
            subject: "test",
            template: "3",
            "recipient-name": "Goylerov Nihad",
            "malicious-link": "http://34.30.123.196:4000/compaign/" + token,


        });
        await Trace.create({
            token: token,
            email: "goylerov04@gmail.com",
        });
        // const compaign = new Compaign(data);
        // await compaign.save();
        // res.send('compaign created');
        // return compaign;
    } catch (error) {
        throw error;
    }
    res.send('compaign created');
}


async function checkToken(req, res) {
    try {
        const token = req.params.token;
        const trace = await Trace.findOne({ token});
        if (!trace) {
            return res.status(404).send('Invalid token');
        }
        return res.send('You are Hacked go to http://34.30.123.196:3000');
    }
    catch (error) {
        res.status(500).send('Internal server error');
        throw error;
    }
}

module.exports = {
    getCompaign,
    createCompaign,
    checkToken
};