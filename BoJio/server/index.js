const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db',sqlite3.OPEN_READWRITE);

const express = require('express')
const app = express()

var cors = require('cors');

app.use(cors({origin: '*'}));

const event = require('./event')
const group = require('./group')
const user = require('./user')

const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/group',group)
app.use('/user',user)
app.use('/event',event)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



