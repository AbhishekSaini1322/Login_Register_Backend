const { application } = require("express")
const User = require("../models/userTable")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();

const login = async (req,res) => {
    const { email,password } = req.body

    if(!email){
        return res.status(400).json({msg:"Please enter email"})
    }
    if(!password){
        return res.status(400).json({msg:"Please enter password"})
    }

    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(401).json({msg:"Email not registered"})
        }

        const payload = {
            email:user.email,
            id:user._id,
            username:user.username
        }
        if(await bcrypt.compare(password,user.password)){
            let token = jwt.sign(payload, 
                           process.env.JWT_SECRET,
                           {
                            expiresIn:'2h',
                           });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            console.log(user);
            
            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                msg:"User login Successfully"
            });
        }
        else{
            return res.status(403).json({
                success:false,
                msg:"Password Incorrect"
            })
        }

        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({success:false,
            msg:"Server error"})
    }
}


module.exports = {login}