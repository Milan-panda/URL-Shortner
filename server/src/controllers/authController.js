const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {jwtSecret, jwtExpiration} = require('../config/authConfig')

async function signup(req, res) {
  const {name, username, email, password} = req.body

  try{
    let user = await User.findOne({ $or: [{username}, {email}]});
    if(user){
      return res.status(400).json({message: 'User already exists'});
    }
    
    //creating a new user
    user = new User({
      name,
      username,
      email, 
      password
    })

    //Hashing the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    //save the user to the database
    await user.save();

    res.status(201).json({message: 'User registered successfully'})
  } catch(error){
    console.error(error);
    res.status(500).send('Server Error');
  }
}


async function login(req, res){
  const {username, password} = req.body;

  try{
    //Check if the user exists
    const user = await User.findOne({username})
    if(!user){
      return res.status(400).json({message: "Username not found"})
    }

    //Check Password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
      return res.status(400).json({message: 'wrong password'});
    }

    //Create and return JWT token
    const payload = {
      user:{
        id: user._id,
      }
    }

    jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiration}, (err, token)=>{
      if(err) throw err;
      res.json({token});
    })
  } catch(error){
    console.error(error);
    res.status(500).send('Server Error');
  }
}



module.exports={
  signup,
  login
}