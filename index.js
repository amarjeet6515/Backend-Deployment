const express= require('express');
const {connection} = require('./config/connection');
require('dotenv').config();
const {userController}= require("./routes/user.routes");
const {notesController}= require("./routes/notes.routes");
const {authenticate} =require("./Authentication/authentication");

const app = express();

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Homepage")
})

app.use("/user",userController);

app.use(authenticate);

app.use("/notes",notesController);

connection.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log('listening on port '+process.env.PORT)
       });
})



