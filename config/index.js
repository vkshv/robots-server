require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  JWT_SALT: process.env.JWT_SALT,
  JWT_PHONE_VERIFICATION_SALT: process.env.JWT_PHONE_VERIFICATION_SALT
}
