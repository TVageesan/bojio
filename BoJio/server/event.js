const express = require('express')

const events = [
  {
    "id" : 1,
    "user_id": 1,
    "start": "2018-11-20 14:00",
    "end": "2018-11-20 18:00",
    "title": "Need to go shopping",
    "icon": "shopping_cart",
    "content": "Click to see my shopping list",
    "contentFull": "My shopping list is rather long:<br><ul><li>Avocados</li><li>Tomatoes</li><li>Potatoes</li><li>Mangoes</li></ul>', // Custom attribute.",
    "class": "leisure"
  },
  {
    "id" : 2,
    "user_id": 1,
    "start": "2018-11-20 20:00",
    "end": "2018-11-21 18:00",
    "title": "Need to go sleep",
    "icon": "shopping_cart",
    "content": "Zzz",
    "class": "sport"
  }
]

const router = express.Router()

// get all events
router.get('/', (req, res) => {
  res.send(events)
})

// get the user's events
router.get('/:id', (req, res) => {
  res.send(events.filter(e => e.user_id == req.params.id))
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About user')
})

module.exports = router
