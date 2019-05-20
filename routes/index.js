const express = require('express')
const router = express.Router()
const User = require('../models/User')
const passport = require('../handlers/passport')
const Data = require('../models/Data')

router.get('/', (req, res, next) => res.render('index'))

router.post('/auth/signup', (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => res.status(200).json(user))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, infoErr) => {
    if (err) return res.status(500).json({ err, infoErr })
    if (!user) return res.status(401).json({ msg: "This user doesn't exist. Please sign up." })
    req.logIn(user, err => {
      if (err) return res.status(500).json(err)
      res.status(200).json(user)
    })
  })(req, res, next)
})

function isLogged(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).json({ msg: "You're not logged in. Please, log in." })
  next()
}

router.get('/auth/profile', isLogged, (req, res, next) => {
  User.find(req.body)
  .then(user => {
    console.log(user)
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.post('/data/addData', (req, res, next) =>{
  Data.create(req.body)
  .then(data => res.status(200).json(data))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.get('/data/marketplace', (req, res, next) => {
  Data.find(req.body)
  .then(data => res.status(200).json(data))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.get('/data/detail', (req, res, next) => {
  Data.find(req.body)
  .then(data => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

module.exports = router