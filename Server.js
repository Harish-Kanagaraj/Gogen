const express = require("express");
const app = express();
const DB=require("./config/db");
const bodyParser=require("body-parser");
const loginRoute=require("./routers/loginroute");
const dotenv=require("dotenv");
dotenv.config();
const port=process.env.PORT||7000;

DB.once("open", () => {
    console.log("Db connection opened");
});

DB.on("error", (err) => {
    console.error("Db connection error:", err);
});

app.use(bodyParser.json());
app.use("/user",loginRoute);


app.listen(port,()=>{
    console.log("Server is running on port",port)
});