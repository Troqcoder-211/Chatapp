const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const generateTokenSetCookie = require("../utils/generateToken");

const signup = async (req, res) => {
  try {
    const { fullName, username, password, comfirmPassword, gender } = req.body;

    if (password !== comfirmPassword)
      return res.status(400).json({ message: "password not match" });

    const user = await User.findOne({ username });

    if (user)
      return res.status(400).json({ message: "username already exists" });

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run/
    const boyProfilePic = `https://avatar-placeholder.iran.liara.run/boy?username=${username}`;
    const girlProfilePic = `https://avatar-placeholder.iran.liara.run/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (!newUser) return res.status(400).json({ message: "Invalid user data" });

    //Generate JWT token here
    generateTokenSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      gender: newUser.gender,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    generateTokenSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      gender: user.gender,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200, json({ message: "Logout successfully" }));
  } catch (error) {
    console.log("Error in logout controller : ", error.message);
    res.status(500).json({ message: "Internal server error " });
  }
};

module.exports = { login, signup, logout };
