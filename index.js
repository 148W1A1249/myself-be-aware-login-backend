const express = require("express");
const cors = require("cors");

//  import db (db connection)
const {connectDB} = require('./db/connectDb')
// import routes
const authRoutes = require('./routes/auth')

const app = express();
app.use(express.json());
app.use(cors());

// middlewares
app.use('/api',authRoutes);

connectDB
.then((port)=>{
    app.listen(port,()=>console.log(`::: App runs with the port ${port}`));
})
.catch(error => console.log(error))

