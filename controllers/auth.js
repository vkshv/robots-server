const jsonwebtoken = require('jsonwebtoken')
const { JWT_SALT, JWT_REG_SALT } = require('../config')
const { setCode, getCode, deleteCode } = require('../store')

const requestCode = async function(req, res) {
  const phone = req.body.phone

  if (/^[7]\d{10}$/.test(phone) === false) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  const prevCode = getCode(phone)
  if (prevCode) {
    if (Date.now() - prevCode.createdAt < 60000) {
      return res.status(429).json({ message: 'Too Many Requests' })
    }
  }

  // отправляем код подтверждения
  const code = '1111'

  setCode(phone, code)

  const token = jsonwebtoken.sign({}, JWT_REG_SALT, { expiresIn: '10m' })
}

module.exports = {
}
