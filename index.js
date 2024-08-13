const express = require("express");
const app = express();
const cors=require('cors')
const mongoose = require('mongoose');
const usersRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/loginRoutes")
const adminRoutes=require("./routes/adminRoutes")
const cartRoutes=require("./routes/cartRoutes")
app.use(express.json());
app.use(cors())
mongoose.connect("mongodb+srv://sugirthavardhinim2022cce:2cN4JQqXPZpyV7f9@cluster0.e4lyr.mongodb.net/").then(()=>{
    console.log("Connected to MongoDB");
})
app.use("/users",usersRoutes);
app.use("/login",loginRoutes);
app.use("/admin",adminRoutes);
app.use("/cart",cartRoutes);

app.listen(3001,()=>{
    console.log("Server is running on port 3001");
})
