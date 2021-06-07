const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const _ = require('lodash')

// send forgot password link to email
exports.forgotPassword = (req, res) =>{
    const {email} = req.body;

    User.findOne({email}, (err, user)=>{
        if(err || !user){
            // return res.status(400).json({error: "Email Doesn't exists."})
            return res.status(200).json({message: "Email Doesn't exists.",type:"error"})
        }
        const token = jwt.sign({_id: user._id},process.env.RESET_PASSWORD_KEY,{expiresIn: '20m'})

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
            subject: 'Myself Be Aware password reset link', // Subject line
            html: `
            <h2> please click the given link to reset your account password</h2>
            <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
            `
        };
        return user.updateOne({resetLink: token}, (err, success)=>{
            if(err){
                // return res.status(400).json({error: "reset password link Error"})
                return res.json({message: "reset password link Error",type:"error"})
            }
            else{
                transporter.sendMail(mailOptions, function (err, info) {
                    if(err){
                      return res.json({error : err.message})
                    }
                    return res.json({message: 'Email has been sent, kindly check your mail to reset password',type:"success"})
                   
                 });
            }
        })
          
    })
}

// reset password 
exports.resetPassword = (req, res)=>{
    const {resetLink, newPass} = req.body;
    if(resetLink){
        jwt.verify(resetLink, process.env.RESET_PASSWORD_KEY, function(err, decodedData){
            if(err){
                // return res.status(401).json({error: "Inncorrect token or Token Expired"});
                return res.status(200).json({message: "Inncorrect token or Token Expired",type:"error"});
            }
            User.findOne({resetLink}, (err, user)=>{
                if(err || !user){
                    // return res.status(400).json({error: "User with this token doesn't exists."})
                    return res.status(200).json({message: "User with this token doesn't exists.",type:"error"})
                }
                const obj ={
                    password: newPass,
                    resetLink: ''
                }
                user = _.extend(user, obj);
                user.save((err, result)=>{
                    if(err){
                        // return res.status(400).json({error: "reset password error"})
                        return res.status(200).json({message: "reset password error",type:"error"})
                    }else{
                        return res.status(200).json({message: 'your passwprd has been changed',type:"success"})
                    }
                })

            })
        })
    }else{
        return res.status(401).json({error: "Authentication Error"})
    }
}