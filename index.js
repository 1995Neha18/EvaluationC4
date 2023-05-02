const express=require("express");
const { connection } = require("./db.js");
const { auth } = require("./middleware/auth.middleware");
const { postRoute } = require("./routes/post.route");
const { UserRoute} = require("./routes/user.route");
const cors = require("cors");

require("dotenv").config();
const app=express();
app.use(express.json());
app.use(cors());
app.use("/user",UserRoute);
 
app.get("/", (req,res)=>{
    res.send("Welcome to home page");
})

app.use(auth)
app.use("/post",auth, postRoute)

app.listen(process.env.port, async(req,res)=> {
        try {
           await connection
           console.log("mongodb connected ") 
        } catch (error) {
            console.log("Not connected");
            console.log(error)
        }  
     console.log("Server is running at PORT 8000 ");
})