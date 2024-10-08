import express from "express";
import cors from "cors";
import connectDB from "./config/moongodb";
import "dotenv/config";
import adminRouter from "./routes/adminRoute";

// app config
const port = process.env.PORT || 3000;
const app = express();
connectDB();

// middlewares
app.use(express.json());
app.use(cors());


app.use("/api/admin", adminRouter)

app.listen(port, () => {
  console.log("Api lsita por el puerto ", port);
});
