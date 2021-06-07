const User = require('../models/user');

// email validation
exports.emailAuthentication = (req, res) =>{
    const {email,password} = req.body;
    User.findOne({email}).exec((err, user)=>{
        if(password === user.password){
            return res.status(200).json({message: "logined Successfully",type:"success"})
        }else{
            // return res.status(401).json({error: "login details are incorrect"})
            return res.status(200).json({message: "login details are incorrect",type:"error"})
        }
    });
} 