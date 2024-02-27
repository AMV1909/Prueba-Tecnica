import { compare } from "bcrypt";
import { user } from "../models/user.js";
import { generateToken } from "../jwt/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    await user
        .findOne({ email })
        .then((data) => {
            if (!data)
                return res.status(404).json({ message: "User not found" });

            if (!data.active)
                return res.status(400).json({ message: "User is not active" });

            compare(password, data.password, (err, result) => {
                if (err) throw err;

                if (!result)
                    return res
                        .status(400)
                        .json({ message: "Invalid password" });

                res.status(200).json({ token: generateToken(data), data });
            });
        })
        .catch((err) => res.status(400).json(err));
};

export const restoreSession = async (req, res) => {
    await user
        .findById(req.decoded._id)
        .then((data) => {
            if (!data)
                return res.status(404).json({ message: "User not found" });

            res.status(200).json(data);
        })
        .catch((err) => res.status(400).json(err));
};
