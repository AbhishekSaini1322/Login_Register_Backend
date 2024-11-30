const express = require("express")
const app = express()
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors)

const dbConnect = require("./config/connection")
dbConnect();

const apiRoutes = require("./routes/userRoute")

app.use("/api",apiRoutes)


const PORT = 3001
app.listen(PORT, ()=> {
    console.log(`server started at port no ${PORT}`);
})