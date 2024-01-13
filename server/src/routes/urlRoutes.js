const express = require("express")
const router = express.Router()
const urlController = require("../controllers/urlController")

router.post('/new', urlController.handleGenerateNewShortURL);
router.get('/:shortUrl', urlController.redirectPage)
router.get('/get/all', urlController.getAllUrls)


module.exports = router