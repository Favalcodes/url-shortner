const userModel = require("../models/Users");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
          throw new Error("Username or Password is required");
        }

        const isExist = await userModel.findOne({username})
        if(isExist) {
            return new Error('Username already exist')
        }

        const hashedPassword = bcrypt.hash(password)
        const user = await userModel.create({ username, password: hashedPassword });
      
        return res
          .status(200)
          .json({ message: "User created successfully", user });
    } catch (error) {
        return new Error(error)
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!username || !password) {
            throw new Error("Username or Password is required");
          }
    
          const isExist = await userModel.findOne({username})
          if(!isExist) {
              return new Error('Username does not exist')
          }
    
        if(isExist && (await bcrypt.compare(password, isExist.password))) {
            const accessToken = jwt.sign({
                user: {username, id: isExist._id},
            }, process.env.JWT, {expiresIn: '1day'})
            res.status(200).json({ message: 'logged in successfully', token: accessToken, user: isExist})
        } else {
            res.status(403).json({ message: 'Login not successful'})
        }
    } catch (error) {
        return new Error(error)
    }
}

module.exports = { createUser, loginUser };
