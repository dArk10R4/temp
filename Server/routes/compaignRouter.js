const express = require('express')
const auth = require('../middleware/auth')
const compaignRouter = express.Router({ mergeParams: true })
const { getCompaign, createCompaign } = require('../controller/compaignController/compaignController')

compaignRouter.get('/compaign', auth, getCompaign);
compaignRouter.post('/compaign', auth, createCompaign);

module.exports = compaignRouter