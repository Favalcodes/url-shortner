const validate = require('validate.js')

const validateUrl = async (url) => {
    return validate({website: url}, {website: {url: true}});
}

module.exports = { validateUrl }