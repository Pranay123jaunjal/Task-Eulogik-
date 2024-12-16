const { response } = require("express")
const User=require("../models/userSchema.js")
const bcryt=require("bcrypt")
const jwt=require("jsonwebtoken")
exports. signup=async(req,res)=>{
try {
    const {name, email, password}=req.body
    if(!name||!email||!password){
        return res.status(400).json({
            success:false,
            message:"all fields are required"
        })
    }
     let existUser=await User.findOne({email})

     if(existUser){
        return res.status(400).json({

            success:false,
            message:"user already existed "
        })
     }
   let hashpassword=await bcrypt.hash(password,10)
      let user=await User.create({name,email,password:hashpassword})
      return res.status(200).json({
        success:true,
        message:"user signup successfully",
        data:user
      })
    
} catch (error) {
    console.log(error)
    console.log("error in signup")
    
}
}

exports.login = async (req,res) => {
    try
    {
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message : "Please fill all the details carefully",
            })
        }

        // check for register user 
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            });
        }

        // Verify password & generate a JWT token

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };


        if(await bcrypt.compare(password,user.password)){
            // password match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message:"User logged in successfully"
            });
        }
        else {
            // password not match
            return res.status(403).json({
                success : false,
                message : "Password does not match",
            })
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Login false" 
        })
    }
}