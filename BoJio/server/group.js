const express = require('express')
const router = express.Router()
const group = [
  {
    "id" : 1,
    "name": "Show filming",
    "owner": 1
  },
  {
    "id" : 2,
    "name": "We Go Jim",
    "owner": 3
  }
]
// define the home page route
router.get('/', (req, res) => {
  res.send(group)
})

router.get('/:id', (req, res) => {
  res.send(group)
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About user')
})

module.exports = router
