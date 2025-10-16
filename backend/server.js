import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"

import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js";

import dotenv from "dotenv";
import orderRouter from "./routes/orderRoute.js"

//app config
dotenv.config(); 

const app = express();
const port = 4000;

// db connection
connectDB();

app.use(cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order",orderRouter)



app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)

})


