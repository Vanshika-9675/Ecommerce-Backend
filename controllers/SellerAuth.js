const bcrypt = require("bcrypt");
const Seller = require("../model/Seller");
const jwt = require('jsonwebtoken')

exports.SellerSignup = async (req, res) => {
  try {
      const { SellerUserName, SellerEmail, SellerPassword } = req.body;

      const existingUser = await Seller.findOne({ SellerEmail });
        
      if (existingUser) {
          return res.status(400).json({
              success: false,
              message: 'Seller already exists'
          });
      }

      const hashedPassword = await bcrypt.hash(SellerPassword, 10);

      const newSeller = await Seller.create({
        SellerUserName, SellerEmail, SellerPassword: hashedPassword
      });

      const seller = {
          id: newSeller._id
      };
        
      const secretKey = 'vanshika';
      const token = jwt.sign({ seller }, secretKey, { expiresIn: '1d' });

      return res.status(200).json({
          success: true,
          message: 'Seller signed up successfully',
          token
      });
  } catch (err) {
      console.log(err);
      return res.status(500).json({
          success: false,
          message: 'Seller cannot be registered, please try again later!'
      });
  }
};

//login
exports.SellerLogin = async (req,res) =>{
      try{
          const {SellerEmail,SellerPassword} = req.body;
          if(!SellerEmail || !SellerPassword){
            return res.status(400).json({
              success:false,
              message:"Please fill all the details careffully"
            })
          }

          //checking if user is available

          let sellerExist = await Seller.findOne({SellerEmail});

          //if not a registered user
          if(!sellerExist){
           return res.status(401).json({
              success:false,
              message:"Seller is not registered"
            })
          }
        
          //verifypassword 
          if(await bcrypt.compare(SellerPassword,sellerExist.SellerPassword)){
            const seller={
              id:sellerExist._id
            }

            const secretKey = 'vanshika';
            const token = jwt.sign({ seller }, secretKey, { expiresIn: '1d' });
              res.status(200).json({
                success:true,
                message:'Seller logged in successfully',
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