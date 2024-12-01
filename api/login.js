const { application } = require("express")
const User = require("../models/userTable")
const bcrypt = require("bcrypt")

const login = async (req,res) => {
    const { email,password } = req.body

    if(!email){
        return res.status(400).json({msg:"Please enter email"})
    }
    if(!password){
        return res.status(400).json({msg:"Please enter password"})
    }

    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({msg:"Email not registered"})
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return res.status(400).json({ msg: "Password does not match" });
        }
        
       return res.status(200).json({ msg: "login success" })
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({msg:"Server error"})
    }
}


module.exports = {login}