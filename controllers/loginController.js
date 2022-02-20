const jwt = require("jsonwebtoken");
const AppError = require('../appError');
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");

const loginController = catchAsync( async (req, res, next) => {
  //console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("provide valid email or password",404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("invalid email or password",401));
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
  });
});

module.exports = loginController;