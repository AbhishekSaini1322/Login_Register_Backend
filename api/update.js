const User = require("../models/userTable");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const userId = req.params._id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if(!email.match(/(?=.*[A-Z])[A-Za-z0-9._%+\-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/)){
      return res.status(400).json({msg: "Invalid email format"})
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: "Email is already in use" });
      }
      user.email = email;
    }

    if(phoneNumber && phoneNumber === user.phoneNumber){
        return res.status(400).json({msg: "Phone number already reagister"})
    }

    if (phoneNumber && phoneNumber !== user.phoneNumber) {
      const phoneRegex = /^\+\d{1,4}\s?\d{10}$/;
      if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({ msg: "Invalid phone number format" });
      }
      user.phoneNumber = phoneNumber;
    }

    if (name && name !== user.name) {
      user.name = name;
    }

    if (password) {
      // const passwordRegex = /(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        if (!password.match(/(?=.*[A-Za-z])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)) {
          return res.status(400).json({ msg: "Invalid password format" });
        }
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ msg: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { update };
