const mongoose = require("mongoose");
const { stringify } = require("querystring");

const subSchema = mongoose.Schema({
    subCode:{
        type: String,
        required:true,
        unique:true,
        sparse:true
    },
    student:[{

        name:{
            type:String,
            required:true
        },
        rollNumber:{
            type:String,
            required:true,
            unique:true,
            sparse:true
        },
        attendance:[
            {
            date:{
                type:Number
            },
            isPresent:Boolean
        }
    ]

    }]
});

const teacherSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        sparse:true
    },
    password:{
        type:String,
        required:true
    },
    subject:{
        type: [subSchema]
    }
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = {Teacher};