const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { jwtSecret, jwtExpiration } = require('../config/authConfig');

async function signup(req, res) {
  const { name, username, email, password } = req.body;

  try {
    // let user_userName = await User.findOne({ $or: [{ username }, { email }] });
    // if (user) {
    //   return res.status(400).json({ error: 'User already exists' });
    // }

    let user_userName = await User.findOne({username})
    if(user_userName) return res.status(400).json({error: 'User name already taken'});

    let user_userEmail = await User.findOne({email})
    if(user_userEmail) return res.status(400).json({error: 'Email already in use'});

    let user;

    user = new User({
      name,
      username,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Username not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Wrong password' });
    }

    const payload = {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        username: user.username
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration }, (err, token) => {
      if (err) throw err;
      res.json({ token, message: 'Login Successful' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
}

module.exports = {
  signup,
  login,
};
