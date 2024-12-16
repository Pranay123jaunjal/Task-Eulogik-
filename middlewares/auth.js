
const jwt=require("jsonwebtoken")
require("dotenv").config()
 const auth=async(req,res,next)=>{
   try {
       const {token}=req.body||req.cookies
       if(!token){
         return res.status(400).json({
            success:false,
            message:"token missing"
         })
       }    
        //verifin the token

       try {
         
          const payload=jwt.verify(token,process.env.JWT_SECRET)
          console.log(payload)
          req.user=payload
       } catch (error) {
       return res.status(400).json({
         success:false,
         messsage:"token is invalid "
       })
       }

       next()
   } catch (error) {
      return res.status(400).json({
         success:false,
         message:"something went wrong while verifying the token"
      })
   }

 }
 

 module.exports={auth}