const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { STATUS_CODE, STATUS_TEXT } = require('./const/http')
const { PORT } = require('./config')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`\x1b[42mrobots-server listening on port ${PORT}\x1b[0m`)
})
