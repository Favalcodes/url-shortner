const urlModel = require("../models/Urls")
const userModel = require("../models/Users")
const { validateUrl } = require("../validator/urlValidator")
const {customAlphabet} = require('nanoid')
const asyncHandler = require('express-async-handler')


const shortenUrl = asyncHandler(async (req, res) => {
    try {
        const { url } = req.body
        await validateUrl(url)
        const shortId = customAlphabet('1234567890abcdef', 10)
        const urlKey = shortId()
        const shortUrl = `${process.env.APP_URL}/${urlKey}`
        await urlModel.create({ user:req.user.id, url, shortUrl, urlKey})
        res.status(200).json({ message: 'Url shortened', url: shortUrl})
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getUrl = asyncHandler(async (req, res) => {
    try {
        const urlKey = req.params.url
        const isExist = await urlModel.findOne({urlKey})
        if (!isExist) {
            res.status(404)
            throw new Error('Url does not exist')
        }
        res.redirect(isExist.url)
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

const getUserUrl = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const isExist = await userModel.findById(userId)
        if(!isExist) {
            res.status(404)
            throw new Error(`User with this id: ${userId} does not exist`)
        }
        const urls = await urlModel.find({user: userId})
    
        res.status(200).response({message: 'User urls found', urls})
    } catch (error) {
        res.status(500)
        throw new Error(error)
    }
})

module.exports = {shortenUrl, getUserUrl, getUrl}