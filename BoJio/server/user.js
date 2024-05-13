const express = require('express')
const router = express.Router()
const user = [
  {
    "id" : 1,
    "name" : "Tom",
    "group_id" : 1
  },
  {
    "id" : 2,
    "name" : "Jerry",
    "group_id" : 1
  },
  {
    "id" : 3,
    "name" : "Berry",
    "group_id" : 2
  }
]
// define the home page route
router.get('/', (req, res) => {
  res.send(user)
})

router.get('/:id', (req, res) => {
  res.send(user)
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About user')
})

module.exports = router
