import { User } from "../models/user.model.js";
import bcryptjs from "bcrypt";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address" });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    const existingUserByEmail = await User.findOne({ email: email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }
    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username already exists" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    // remove password from the response
    const newUser = new User({
      email,
      password: hashPassword,
      username,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User created successfully 🎉",
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Signup controller", error.message);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong 💀" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({ success: false, message: "Invalid Credentials" });
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      res.status(404).json({ success: false, message: "Invalid Credentials" });
    }
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in Login controller", error);
    res.status(404).json({ success: false, message: "Invalid Credentials" });
  }
}
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully 🎉" });
  } catch (error) {
    console.log("Error in Logout Controller", error);
    res.send(500).json({ success: false, message: "internal server error" });
  }
}

export async function authCheck (req,res){
  try{
    res.status(200).json({success:true,user:req.user})

  }catch(error){
    console.log("Error in AuthCheck Controller",error.message);
    res.status(500).json({success:false,message:"Internal Server Error"});
  }
}


// netflixClone12
