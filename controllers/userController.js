const userModel = require('../models/userModel')
//login callback
const loginController = async function(req,res){
      try {
        const {email,password} = req.body
        const user = await userModel.findOne({email,password})
        if(!user)
        {
           return res.status(404).send('User Not Found')
        }
     
          return  res.status(200).json({
                success: true,
                user,
            });
        

      } catch (error) {
       return res.status(400).json({
            success:false,
            error,
        })}
      
}

// register callback
const registerController = async function (req,res)
{
    try {
        const newUser = new userModel(req.body)
        await newUser.save();
    return res.send(201).json({
            success:true,
            newUser,
        })
        
    } catch (error) {
       return res.status(400).json({
            succes:false,
            error,
        })
        
    }
}

//export
module.exports= {loginController,registerController}