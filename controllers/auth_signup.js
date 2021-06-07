const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

// create user without email account activation
// exports.signup = (req, res) =>{
//     console.log(req.body);
//     const {name,email,password} = req.body;
//     User.findOne({email}).exec((err, user)=>{
//         if(user){
//             return res.status(400).json({error: "User with this email already exists."})
//         }
//         let newUser = new User({name, email, password});
//         newUser.save((err, success) =>{
//             if(err){
//                 console.log("Error in signup: ", err);
//                 return res.status(400).json({error: err})
//             }
//             res.json({
//                 message: "Signup success!"
//             })
//         })
//     });
// } 


// create user with email account activation
exports.signup = (req, res) =>{
    // console.log(req.body);
    const {name,email,password} = req.body;
    User.findOne({email}).exec((err, user)=>{
//         console.log("user: ",user);
        if(user){
            return res.status(200).json({message: "User with this email already exists.",type:"error"})
        }

        const token = jwt.sign({name, email, password},process.env.JWT_ACC_ACTIVATE,{expiresIn: '20m'})

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                   user: process.env.EMAIL,
                   pass: process.env.PASSWORD
               }
           });
           const mailOptions = {
            from: 'myselfbeaware@gmail.com', // sender address
            to: email, // receivers
            subject: 'Myself Be Aware activation link', // Subject line
            html: `
            <h2> please click the given link to activate your account</h2>
            <p>${process.env.CLIENT_URL}/authentication/activate/${token}</p>
            `
          };
          transporter.sendMail(mailOptions, function (err, info) {
            if(err){
              return res.json({error : err.message})
            }
            return res.json({message: 'Email has been sent, kindly check your mail to activate the account',type:"success"})
           
         });
        
    });
} 

exports.activateAccount =(req, res)=>{
  const {token} = req.body;
  if(token){
    jwt.verify(token,process.env.JWT_ACC_ACTIVATE, function(err,decodedToken){
      if(err){
        return res.status(200).json({message: "Incorrect or Expired link",type:"error"})
        // return res.status(400).json({error: 'Incorrect or Expired link'})
      }
      const {name, email, password} = decodedToken;
      User.findOne({email}).exec((err, user)=>{
        if(user){
          return res.status(200).json({message: "This Account is Already Activate.",type:"error"})
        }
        let newUser = new User({name, email, password});
        newUser.save((err, success) =>{
          if(err){
              console.log("Error in signup while account activation: ", err);
              return res.status(400).json({error: "Error activation account"})
          }
          res.json({
              message: "Signup success!",
              type:"success"
          })
        })
      });
    })

  }else{
    return res.json({error: "Somthing went wrong!!!"})
  }
}
