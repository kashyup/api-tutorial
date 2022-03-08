const {Teacher}=require("../model/sub.model");

async function register(request,response){
    const { mail } = request.query;
    const { name , email, password } = request.body;

    try{
        const emailExist = Teacher.findOne({email:mail});
        if(emailExist){
            response.json({message:"account already exist"});
        }
        else{
            const newTeacher = new Teacher({name,email,password});
            await newTeacher.save();
            response.json({message:"account created successfully"})
        }
    }
    catch(error){
        console.log({message:error.message});

    }
}
async function login(request, response){

    const {email,password} = request.query;
    try{
        const teacher = await Teacher.findOne({email:mail});
        console.log(teacher);

        if(teacher){
            if(teacher.password===password){
                response.json({message:"account verified"});
            }
            else{
                response.json({message:"invalid password"});
            }
        }
        else{
            response.json({message:"account doesn't exist please sign up"});
        }
    }
    catch(error){
        console.log({message:error.message});
    }
}



async function sub(request,response){
    const {email,password,subjects}=request.body;
    try{
        const filter = {email:email,password:password};
        const update ={$set:{Subject:subjects}};

        const teacher = await Teacher.findOneAndUpdate(filter,update,{new:true});
        console.log(teacher);
        response.json({message:"subject data added"});
    }
    catch(error){
        console.log({message:error.message});
    }
}

async function attend( request , response){
    const {email,password,subCode,StuRoll,from,till}=request.query;
    
    try{
  const teacher = await Teacher.findOne({email:email,password:password});

  if(teacher){
      let presentCount = 0;
      let absentCount = 0;
      teacher.subject.find((it)=>it.subCode==subCode)
      ?.student.find((it)=>it.rollNumber==stuRoll)
      ?.attendance?.filter((it)=>it.date >=from && it.date <= till)
      ?.map((it)=>{
          if(it.isPresent){
              presentCount++;
          }
          else{
              absentCount++;
          }
      });
      console.log(`present ${presentCount} absent ${absentCount}`);
      response.json({
          message:`Present= ${presentCount} & Absent = ${absentCount}`,
      });

  }
  else{
      response.json({message:"account doesn't exist "});
  }

    }
    catch(error){
        response.status(404).json({message:error.message});
    }
}


module.exports ={
    register,
    login,
    sub,
    attend
};