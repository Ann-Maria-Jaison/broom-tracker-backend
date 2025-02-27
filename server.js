const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const dataFile = "data.json";

// Get broom status
app.get("/status", (req, res) => {
    fs.readFile(dataFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Failed to read data" });
        res.json(JSON.parse(data));
    });
});

// Update broom status
app.post("/update", (req, res) => {
    const { broomHolder } = req.body;
    const newData = { broomHolder };

    fs.writeFile(dataFile, JSON.stringify(newData, null, 2), (err) => {
        if (err) return res.status(500).json({ error: "Failed to update data" });
        res.json({ message: "Broom status updated", data: newData });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
