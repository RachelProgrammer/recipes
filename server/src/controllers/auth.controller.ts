import { Request, RequestHandler, Response } from "express";

import User from "../models/auth.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import assert from "assert";
import { DtoSignin, DtoSignup } from "../dto/auth.dto";

const generateToken = (userId: string) =>
    jwt.sign({ userId }, process.env.JWT_SECRET as jwt.Secret, { expiresIn: "1d" });

export const signin: RequestHandler = async (req: Request<{}, {}, DtoSignin>, res: Response): Promise<any> => {
    try {
        const { username, password, token } = req.body;
        
        if (token) { // if token is provided, verify and return user info
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET as jwt.Secret) as any;
                const user = await User.findById(decoded.userId).select("-Password");
                if (!user) return res.status(401).send("user not found");
                return res.json({ token, user });
            } catch (error) {
                return res.status(401).send("invalid token");
            }
        }

        assert(username, "missing 'username'");
        assert(password, "missing 'password'");

        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).send("incorrect username or password");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send("incorrect username or password");

        const newToken = generateToken(user._id.toString());
        res.json({ token: newToken, user });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}




export const signup: RequestHandler = async (req: Request<{}, {}, DtoSignup>, res: Response): Promise<any> => {
    
    try {
        const { username, password, name, phone, email } = req.body;

        assert(username, "missing 'username'");
        assert(name, "missing 'name'");
        assert(password, "missing 'password'");
        assert(email, "missing 'email'");

        const existingUser = await User.findOne({ $or: [{ username: username }, { email: email }] });
        if (existingUser)
            return res.status(400).send("username or email already in use");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, name, phone, email });
        await newUser.save();

        const token = generateToken(newUser._id.toString());
        res.json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
}
