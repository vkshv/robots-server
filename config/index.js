require('dotenv').config()

module.exports = {
  PORT: process.env.PORT,
  JWT_SALT: process.env.JWT_SALT,
  JWT_REG_SALT: process.env.JWT_REG_SALT
}
