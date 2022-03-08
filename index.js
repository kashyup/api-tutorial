const express = require("express");
const { default: mongoose } = require("mongoose");

const common = require("./config/config");

const app = express();

app.use(express.json({extended:true}));

app.use(express.urlencoded({extended:true}));

const PORT = common.config()["PORT"];

const URL = common.config()["MONGODB_URL"];

app.use("/api",router);

console.log(PORT);
console.log(URL);

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

