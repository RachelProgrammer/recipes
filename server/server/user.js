const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const UserServer = {
    login: async (req, res) => {
        try {
            const { Username, Password, token } = req.body;

            // if token is provided, verify and return user info
            if (token) {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET);
                    const user = await User.findById(decoded.userId).select("-Password");
                    if (!user) return res.status(401).send("משתמש לא נמצא");
                    return res.json({ token, user });
                } catch (error) {
                    return res.status(401).send("טוקן לא חוקי");
                }
            }

            // if no token, check username and password
            const user = await User.findOne({ Username });
            if (!user) return res.status(400).send("לא נמצא משתמש מתאים");

            const isMatch = await bcrypt.compare(Password, user.Password);
            if (!isMatch) return res.status(400).send("סיסמה שגויה");

            const newToken = generateToken(user._id);
            res.json({ token: newToken, user });
        } catch (error) {
            res.status(500).send("שגיאה בשרת");
        }
    },


    signup: async (req, res) => {
        try {
            const { Username, Password, Name, Phone, Email, Tz } = req.body;

            if (!Username || !Name || !Password || !Phone || !Email || !Tz) {
                return res.status(400).send("לא מולאו כל הפרטים");
            }

            const existingUser = await User.findOne({ $or: [{ Username }, { Email }] });
            if (existingUser) return res.status(400).send("שם משתמש או מייל כבר תפוס");

            const hashedPassword = await bcrypt.hash(Password, 10);
            const newUser = new User({ Username, Password: hashedPassword, Name, Phone, Email, Tz });
            await newUser.save();

            const token = generateToken(newUser._id);
            res.json({ token, user: newUser });
        } catch (error) {
            res.status(500).send("שגיאה בשרת");
        }
    }
};

module.exports = UserServer;
