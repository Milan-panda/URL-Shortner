const URL = require("../models/url");
const { nanoid } = require("nanoid");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  try {
    const shortID = nanoid(8);

    const newURL = new URL({
      originalUrl: body.url,
      shortUrl: shortID,
      userId: req.user.id,
      visitHistory: [],
    });

    await newURL.save();
    res.status(201).json({ id: shortID });
  } catch (error) {
    console.error(error);
    res.json(500).send("Server Error");
  }
}

async function redirectPage(req, res) {
  try {
    const shortUrl = req.params.shortUrl;

    const entry = await URL.findOneAndUpdate(
      { shortUrl },
      {
        $addToSet: {
          visitHistory: {
            timeStamp: Date.now(),
          },
        },
      },
      { new: true }
    );

    if (!entry) {
      console.error("Document not found");
      return res.status(404).send("Not Found");
    }

    res.redirect(entry.originalUrl)
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function getAllUrls(req, res) {
  try {
    const userId = req.user.id;
    const urls = await URL.find({userId: userId});

    res.json(urls)
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error')
  }
}

module.exports = {
  handleGenerateNewShortURL,
  redirectPage,
  getAllUrls
};
