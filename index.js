const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { PORT } = require('./config')

const app = express()
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
  console.log(`\x1b[32m╔═══════════════════════════════════════════╗
║    Server started ${new Date().toLocaleString('ru-RU')}    ║
╚═══════════════════════════════════════════╝\x1b[0m`)
})
