import { hash } from "bcrypt";
import { user } from "../models/user.js";

export const createDefaultAdmin = async (req, res) => {
    const hashedPassword = await hash("jp5yZciY3pn756O2", 10);

    try {
        const alreadyExists = await user.findOne({ role: "Admin" });

        if (alreadyExists)
            return res.status(400).json({ message: "Admin already exists" });

        await user.create({
            _id: 1,
            name: "admin",
            email: "admin@admin.com",
            password: hashedPassword,
            role: "Admin",
        });

        return res.status(201).json({ message: "Admin created" });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

export const getUsers = async (req, res) => {
    await user
        .find()
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const getUser = async (req, res) => {
    await user
        .findById(req.params._id)
        .then((data) => res.status(200).json(data))
        .catch((err) => res.status(400).json(err));
};

export const createUser = async (req, res) => {
    const { _id, name, email, password, role } = req.body;

    const hashedPassword = await hash(password, 10);

    try {
        const idExists = await user.findOne({ _id: _id });

        if (idExists)
            return res.status(405).json({ message: "User already exists" });

        const emailExists = await user.findOne({ email: email });

        if (emailExists)
            return res.status(406).json({ message: "User already exists" });

        await user.create({ _id, name, email, password: hashedPassword, role });

        res.status(201).json({ message: "User created" });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err });
    }
};

export const updateUser = async (req, res) => {
    const { _id, name, email, password, role } = req.body;

    try {
        const hashedPassword = await hash(password, 10);

        await user.updateOne(
            { _id: _id },
            {
                name,
                email,
                password: hashedPassword,
                role,
                updatedAt: Date.now(),
            }
        );

        res.status(200).json({ message: "User updated" });
    } catch (err) {
        return res.status(400).json({ message: err });
    }
};

export const deleteUser = async (req, res) => {
    await user
        .findByIdAndUpdate(req.params._id, {
            active: false,
            updatedAt: Date.now(),
        })
        .then(() => res.status(200).json({ message: "User deleted" }))
        .catch((err) => res.status(400).json(err));
};
