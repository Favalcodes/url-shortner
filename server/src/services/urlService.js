const urlModel = require("../models/Urls")
const userModel = require("../models/Users")
const { validateUrl } = require("../validator/urlValidator")
const nanoid = require('nanoid')


const shortenUrl = async (req, res) => {
    try {
        const { url } = req.body
        await validateUrl(url)
        const shortId = nanoid.urlAlphabet()
        const shortUrl = `${process.env.WEB_URL}/${shortId}`
        await urlModel.create({ user, url, shortUrl})
        return res.status(200).json({ message: 'Url shortened', url: shortUrl})
    } catch (error) {
        return new Error(error)
    }
}

const getUrl = async (req, res) => {
    try {
        const url = req.params.url
        const isExist = await urlModel.findOne({shortUrl: url})
        if (!isExist) {
            throw new Error('Url does not exist')
        }
        res.redirect(isExist.url)
    } catch (error) {
        return new Error(error)
    }
}

const getUserUrl = async (req, res) => {
    try {
        const userId = req.params.id
        const isExist = await userModel.findById(userId)
        if(!isExist) {
            throw new Error(`User with this id: ${userId} does not exist`)
        }
        const urls = await urlModel.find({user: userId})
    
        return res.status(200).response({message: 'User urls found', urls})
    } catch (error) {
        return new Error(error)
    }
}

module.exports = {shortenUrl, getUserUrl, getUrl}