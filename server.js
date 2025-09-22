const express = require("express");
const app = express();
const session = require("express-session");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 4500;

// middleware 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// session setup 

app.use(
    session({
        secret: "supersecretkey",
        resave: false,
        saveUninitialized: false,
        cookie: {secure: false}
    })
);


//
app.use("/auth", authRoutes);




app.get("/", (req, res) => {
    res.send("server is running");
});



app.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT} `);
});
