require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const routestodo = require("./routes/todoRoutes");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(routestodo);
if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
}

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Listening on port ${port}...`));
