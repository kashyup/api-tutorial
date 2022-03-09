const express = require("express");
const {default:mongoose} = require("mongoose")

const router = require('./routes/routes')

const cors = require("cors");

const morgan = require("morgan");

const common = require("./config/config");

const app = express();

app.use(express.json({extended:true}));

app.use(express.urlencoded({extended:true}));



app.use(morgan("dev"));

app.use("/api",router);

const PORT = common.config()["PORT"];

const URL = common.config()["MONGODB_URL"];

console.log(URL);
console.log(PORT);



mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is listening on port:${PORT}`);
    });
    console.log("mongodb is connected");
})
.catch((error)=>{
    console.log("Error",error.message);
});

