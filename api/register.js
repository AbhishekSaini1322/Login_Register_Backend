const User = require("../models/userTable");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { email, password, name, phoneNumber } = req.body;
  console.log("error error");
  
  const fields = { email, password, name, phoneNumber };

  for (let field in fields) {
    if (!fields[field]) {
      return res.status(400).json({ msg: `Please enter ${field}` });
    }
  }

  try {
    const alreadyExist = await User.findOne({ email });
    const phoneExist = await User.findOne({ phoneNumber });
    const phoneRegex = /^\+\d{1,4}\s?\d{10}$/;

    if (!email.match(/(?=.*[A-Z])[A-Za-z0-9._%+\-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
    if (!phoneRegex.test(phoneNumber)) {
      return res.status(400).json({ msg: "Invalid phone number format" });
    }
    if (alreadyExist) {
      return res.status(400).json({ msg: "Email already register" });
    }
    if (phoneExist) {
      return res.status(400).json({ msg: "Phone number already register" });
    }

    if (!password.match(/(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
      return res.status(400).json({ msg: "Invalid password format" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashPassword,
      name,
      phoneNumber,
    });

    await newUser.save();

    return res.status(200).json({
      username: newUser.username,
      email,
      name,
      phoneNumber,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { register };
