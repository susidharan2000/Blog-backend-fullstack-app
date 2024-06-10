import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./Database/Config.js";
import AuthRouter from "./Routers/AuthRouter.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//error handler
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success:false,
        statusCode:statusCode,
        message:message
    });
});


ConnectDB();

const port = process.env.PORT;
//Default Route
app.get("/",(req,res)=>{
    res.status(200).send("API is running");
});

//API Route

app.use("/api/auth",AuthRouter);

app.listen(port,()=>{
    console.log("App is running",port);
});