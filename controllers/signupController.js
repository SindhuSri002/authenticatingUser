const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');


const signupController = catchAsync(async (req,res,next) => {

    //console.log(req.body);
    const newUser = await User.create(req.body);

    //payload -- secret -- headers
    // console.log({id: newUser._id});
    // console.log(process.env.JWT_EXPIRES_IN);
    const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    }); 

    res.status(201).json({
        status:"success",
        token,
        data: newUser
    });

});

module.exports = signupController;