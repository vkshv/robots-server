const jsonwebtoken = require('jsonwebtoken')
const { JWT_SALT, JWT_REG_SALT } = require('../config')

const requestCode = async function(req, res) {
  const phone = req.body.phone
  if (/^[7]\d{10}$/.test(phone) === false) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  // 

  const token = jsonwebtoken.sign({}, JWT_REG_SALT, { expiresIn: '1h' })
}

module.exports = {
}
