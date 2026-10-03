import { createUser, getUserByEmail } from "../model/userModel.js";

export const signup = async(req,res)=>{
   const {name, email, password }  = req.body;
    
    const user = await createUser(name ,email ,password);
    return res.json(user);
};

export const login = async(req,res)=>{
  const {email,password} = req.body;
  const user = await getUserByEmail(email);

  if(!user){
     return res.status(400).json({messaage:"User not found"});
  }
   if(user.password !== password){
     return res.status(401).json({message:"wrong password"})
   }

  return res.json(user);
};
