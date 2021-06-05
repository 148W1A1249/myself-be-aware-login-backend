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

// https://www.youtube.com/watch?v=Va9UKGs1bwI
// https://www.youtube.com/watch?v=kfw61IxDgW8
// https://www.youtube.com/watch?v=CEim3tZsp1Y
// https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/#:~:text=Mongoose%20is%20an%20Object%20Data,js.&text=MongoDB%20is%20a%20schema%2Dless,not%20enforced%20like%20SQL%20databases.



