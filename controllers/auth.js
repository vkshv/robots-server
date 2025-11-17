const jwt = require('jsonwebtoken')
const { JWT_SALT, JWT_PHONE_VERIFICATION_SALT } = require('../config')
const { setCode, getCode, deleteCode } = require('../store/auth')

const requestCode = async function(req, res) {
  const phone = req.body?.phone

  if (/^[7]\d{10}$/.test(phone) === false) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  const prev = getCode(phone)
  if (prev) {
    if (Date.now() - prev.createdAt < 60 * 1000) {
      return res.status(429).json({ message: 'Too Many Requests' })
    }
  }

  // отправляем код подтверждения
  const code = '1111'

  setCode(phone, code, 10 * 60 * 1000)

  return res.json({
    token: jwt.sign({ phone }, JWT_PHONE_VERIFICATION_SALT, { expiresIn: '10m' }),
    deliveryChannel: 'sms'
  })
}

const verifyCode = async function(req, res) {
  const auth = req.headers?.authorization
  const code = req.body?.code

  try {
    const token = auth.split(/ /).at(-1)
    const { phone } = jwt.verify(token, JWT_PHONE_VERIFICATION_SALT)
    if (getCode(phone).code !== code) throw new Error()

    deleteCode(phone)
    return res.json({
      token: jwt.sign({ phone }, JWT_SALT, { expiresIn: '30d' })
    })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

module.exports = {
  requestCode,
  verifyCode
}
