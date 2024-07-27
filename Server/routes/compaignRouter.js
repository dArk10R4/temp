const express = require('express')
const auth = require('../middleware/auth')
const compaignRouter = express.Router({ mergeParams: true })
const { getCompaign, createCompaign, checkToken } = require('../controller/compaignController/compaignController')

compaignRouter.get('/', auth, getCompaign);
compaignRouter.post('/', auth, createCompaign);
compaignRouter.get('/:token', checkToken);

module.exports = compaignRouter