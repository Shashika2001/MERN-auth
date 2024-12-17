import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = bcryptjs.hashSync(password, 10);
   const newUser = new User({ username, email, password: hashedPassword});
   try{
    await newUser.save()
   res.status(201).json({ message: "User created successfully" });
   } catch(error){
   next(error);
   }
   
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));

    // Check if password is correct
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    // Generate JWT token
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Add token expiry for security
    });

    // Exclude sensitive fields
    const { password: hashedPassword, ...rest } = validUser._doc;

    // Set cookie options
    const expiryDate = new Date(Date.now() + 3600000); // 1-hour expiry
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Secure in production
      expires: expiryDate,
    })
      .status(200)
      .json({ success: true, user: rest });
  } catch (error) {
    next(error); // Pass errors to global error handler
  }
};
