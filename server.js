require('dotenv').config()

const micro = require('micro')

const server = micro(require('./'))
server.listen(3000)
