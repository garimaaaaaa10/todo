const express = require("express")
const app = express();
const cors = require("cors");

const conn = require("./conn/conn");
const path = require("path");
const auth = require("./models/routes/auth");
const list = require("./models/routes/list");

app.use(express.json());
app.use(cors());

// Ensure DB is connected before every request (important for Vercel serverless)
app.use(async (req, res, next) => {
    try {
        await conn();
        next();
    } catch (error) {
        console.log("DB Connection failed:", error.message);
        res.status(500).json({ message: "Database connection failed" });
    }
});

app.use("/api/v1",auth);
app.use("/api/v2",list);

app.use(express.static(path.join(__dirname, "frontend", "build")));
app.get("/*splat",( (req,res) =>{
    
    res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
}));

app.listen(1000, () => {
    console.log("started");

});
module.exports = app;