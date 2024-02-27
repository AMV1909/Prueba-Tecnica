export const verifyAdmin = (req, res, next) => {
    if (req.decoded.role !== "Admin")
        return res.status(403).json({ message: "Unauthorized" });

    next();
};

export const verifyDoctor = (req, res, next) => {
    if (req.decoded.role !== "Doctor")
        return res.status(403).json({ message: "Unauthorized" });

    next();
};

export const verifySpecialist = (req, res, next) => {
    if (req.decoded.role !== "Especialista")
        return res.status(403).json({ message: "Unauthorized" });

    next();
};
