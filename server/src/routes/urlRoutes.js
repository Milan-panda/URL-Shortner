const express = require("express")
const router = express.Router()
const urlController = require("../controllers/urlController")

router.post('/new', urlController.handleGenerateNewShortURL);
router.get('/get/all', urlController.getAllUrls)

//Anyone can access
router.get('/:shortUrl', urlController.redirectPage)

module.exports = router