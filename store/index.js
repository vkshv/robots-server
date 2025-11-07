const authCodes = new Map()

const setCode = function(phone, code, lifetime = 900000) { // to prevent verification code from expiring before auth token
  authCodes.set(phone, { code, createdAt: Date.now() })
  setTimeout(() => {
    authCodes.delete(phone)
  }, lifetime)
}

const getCode = function(phone) {
  return authCodes.get(phone)
}

const deleteCode = function(phone) {
  authCodes.delete(phone)
}

module.exports = {
  setCode,
  getCode,
  deleteCode
}
