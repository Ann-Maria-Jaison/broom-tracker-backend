const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let broomHolder = null;
let historyLog = []; // Store history of who took the broom

app.get("/status", (req, res) => {
    res.json({ broomHolder, historyLog });
});

app.post("/update", (req, res) => {
    const { broomHolder: newHolder } = req.body;

    if (newHolder) {
        historyLog.push({ name: newHolder, time: new Date().toLocaleString() });
    }

    broomHolder = newHolder;
    res.json({ message: "Status updated", broomHolder, historyLog });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
