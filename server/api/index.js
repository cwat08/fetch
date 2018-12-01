const router = require('express').Router()
const axios = require('axios')
const {Website} = require('../db/models')
module.exports = router

//router.use('/users', require('./users'))
router.get('/surprise', async (req, res, next) => {
  try {
    const site = await Website.findById(4)

    const results = await axios.get(`https://${site.url}`)
    //make into new function to stay D.R.Y.
    const htmlArr = results.data
      .split('<')
      .map(e => {
        return `<${e}`
      })
      .slice(1)
    res.send(htmlArr)
  } catch (err) {
    console.log(err.message)
  }
})
router.get('/fetch/:protocol/:searchUrl', async (req, res, next) => {
  try {
    const results = await axios.get(
      req.params.protocol === 'https'
        ? `https://${req.params.searchUrl}`
        : `http://${req.params.searchUrl}`
    )
    // const results = await axios.get(`${req.params.searchUrl}`)
    if (results.data === null) {
      res.send(null)
    }
    const htmlArr = results.data
      .split('<')
      .map(e => {
        return `<${e}`
      })
      .slice(1)
    res.send(htmlArr)
  } catch (err) {
    console.log(err.message)
    res.send('error')
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
