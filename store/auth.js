const codeMap = new Map()

const setCode = function(phone, code, lifetime) {
  codeMap.set(phone, { code, createdAt: Date.now() })
  setTimeout(function() {
    codeMap.delete(phone)
  }, lifetime)
}

const getCode = function(phone) {
  return codeMap.get(phone)
}

const deleteCode = function(phone) {
  codeMap.delete(phone)
}

module.exports = {
  setCode,
  getCode,
  deleteCode
}
