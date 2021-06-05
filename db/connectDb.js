const {DBURL,port} = require("../helpers/environment");
const Mongoose = require("mongoose");
// const { request } = require("express");

const connectDB = new Promise((resolve,reject)=>{
    try {
        Mongoose.connect(DBURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex: true
        });
        console.log(`::: Database connection established`);
        resolve(port);
    } catch (error) {
        console.log(error);
        reject(error);
    }
})

module.exports = {connectDB};