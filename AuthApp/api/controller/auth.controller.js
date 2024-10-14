import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
export  const signup = async (req, res , next) => {  
    const { userName,  password, email } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
        userName,
        password : hashedPassword,
        email
        }); 

        try{     
       await newUser.save();
       res.status(201).json({message: 'User created successfully'});
        }catch(error){
           next(error);
        }

}