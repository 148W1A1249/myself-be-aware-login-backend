const User = require('../models/user');

exports.userDetails = async (req, res)=>{
   const data =  await User.find();
    res.status(200).json({data});
}