const express = require("express")
const app = express()
const cors = require("cors");
const apiRoutes = require("./routes/userRoute")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api",apiRoutes)

const dbConnect = require("./config/connection");
dbConnect();

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log(`server started at port no ${PORT}`);
})
