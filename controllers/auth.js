const bcrypt = require("bcrypt");
const User = require("../model/User");
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  try {
      const { userName, email, password } = req.body;

      const existingUser = await User.findOne({ email });
        
      if (existingUser) {
          return res.status(400).json({
              success: false,
              message: 'User already exists'
          });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
          userName, email, password: hashedPassword
      });

      const user = {
          id: newUser._id
      };
        
      const secretKey = 'vanshika';
      const token = jwt.sign({ user }, secretKey, { expiresIn: '1d' });

      return res.status(200).json({
          success: true,
          message: 'User signed up successfully',
          token
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          success: false,
          message: 'User cannot be registered, please try again later!'
      });
  }
};

//login
exports.login = async (req,res) =>{
      try{
          const {email,password} = req.body;
          if(!email || !password){
            return res.status(400).json({
              success:false,
              message:"Please fill all the details careffully"
            })
          }

          //checking if user is available

          let userExist = await User.findOne({email});

          //if not a registered user
          if(!userExist){
           return res.status(401).json({
              success:false,
              message:"User is not registered"
            })
          }
        
          //verifypassword 
          if(await bcrypt.compare(password,userExist.password)){
            const user={
              id:userExist._id
            }

            const secretKey = 'vanshika';
            const token = jwt.sign({ user }, secretKey, { expiresIn: '1d' });
              res.status(200).json({
                success:true,
                message:'User logged in successfully',
                token
              })

          }
          else{
            return res.status(403).json({
                  success:false,
                  message:"Password Incorrect"
            });
          }
      }
      catch(err){
          console.log(err);
          return res.status(500).json({
            success:false,
            message:'login failure'
          })
      }

}