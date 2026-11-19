import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());n

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const size = res.getHeader("Content-Length") || 0;

        console.log(
            `${req.method} ${req.originalUrl} → ${res.statusCode} | ${size} bytes | ${duration} ms`
        );
    });

    next();
});

let userData = [
    { id: 1, name: "Aayushi Sharma", phone: "7827536087", email: "aayushi@gmail.com" },
    { id: 2, name: "Anshika Tomar", phone: "7845336087", email: "anshika@gmail.com" },
    { id: 3, name: "Pihu Sharma", phone: "2937536087", email: "pihu@gmail.com" },
    { id: 4, name: "Aditi Sehrawat", phone: "7827893273", email: "aditi@gmail.com" }
];

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to user API" });
});

app.get("/user", (req, res) => {
    res.status(200).json({
        message: "All users fetched successfully",
        users: userData
    });
});

app.get("/user/ids", (req, res) => {
    const ids = userData.map(user => user.id);

    res.status(200).json({
        message: "All user IDs fetched successfully",
        ids
    });
});

app.get("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = userData.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    res.status(200).json({
        message: "User fetched successfully",
        user
    });
});

app.post("/create", (req, res) => {
    try {
        const { name, email, phone } = req.body;

        const newUser = {
            id: userData.length + 1,
            name,
            email,
            phone
        };

        userData.push(newUser);

        res.status(201).json({
            message: "User created successfully",
            newUser
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

app.put("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = userData.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    userData[index] = {
        ...userData[index],
        ...req.body
    };

    res.status(200).json({
        message: "User updated successfully",
        user: userData[index]
    });
});

app.delete("/user/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const newData = userData.filter(user => user.id !== id);

    if (newData.length === userData.length) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    userData = newData;

    res.status(200).json({
        message: "User deleted successfully"
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});