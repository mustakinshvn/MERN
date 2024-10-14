import User from '../Models/user.model.js';
import bcryptjs from 'bcryptjs';
export  const signup = async (req, res , next) => {  
    const { userName,  email, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUser = new User({
        userName,
        email,
        password : hashedPassword
    
        }); 

        try{     
       await newUser.save();
       res.status(201).json({message: 'User created successfully'});
        }catch(error){
           next(error);
        }

}