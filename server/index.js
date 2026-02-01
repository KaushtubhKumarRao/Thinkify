import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import databaseConnection from "./config/databaseConnection.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();

/* ✅ SAFETY DEFAULT */
const PORT = process.env.PORT || 3000;

/* CORS MUST COME FIRST */
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "https://thinkify.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

/*  HANDLE PREFLIGHT */
app.options("*", cors());

/* MIDDLEWARE */
app.use(express.json());
app.use(cookieParser());

/* DB */
databaseConnection(
    process.env.DATABASE_URL,
    process.env.DATABASE_NAME
);

/* ROUTES */
app.use("/api", router);

app.get("/", (req, res) => {
    res.send("Server Running Successfully");
});

app.listen(PORT, () => {
    console.log(`Server Listening at http://localhost:${PORT}`);
});
