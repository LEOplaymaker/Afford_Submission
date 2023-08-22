const express = require("express");
const cors = require("cors");
const app = express();
const goto = require("./router/router"); 


app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! hi");
    }
);

app.use("/", goto);


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
