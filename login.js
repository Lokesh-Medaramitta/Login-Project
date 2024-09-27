const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "mysql", // Changed to 'mysql'
    user: "root",
    password: "Lokesh@2004",
    database: "nodejs"
});

// Connect to the database
connection.connect(function(error) {
    if (error) throw error;
    else console.log("Connected to the database successfully!");
});

// Serve login page
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

// Handle login
app.post("/", encoder, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    connection.query("SELECT * FROM loginuser WHERE user_name = ? AND user_pass = ?", [username, password], function(error, results) {
        if (results.length > 0) {
            res.redirect("/welcome");
        } else {
            res.redirect("/");
        }
    });
});

// Serve signup page
app.get("/signup", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

// Handle signup
app.post("/signup", encoder, function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    connection.query("INSERT INTO loginuser (user_name, user_pass) VALUES (?, ?)", [username, password], function(error, results) {
        if (error) {
            console.error(error);
            res.redirect("/signup"); // Redirect back to signup on error
        } else {
            res.redirect("/");
        }
    });
});

// When login is successful
app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/welcome.html");
});

// Set app port
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

