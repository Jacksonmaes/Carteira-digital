import express, { json } from "express";
import authRouter from "./routes/authRouters.js";
import { connectDb } from "./config/database.js";
import transactionRouter from "./routes/transactionRoutes.js";
import cors from "cors";

connectDb();

const app = express();
app.use(json());
app.use(cors());
app.use(authRouter);
app.use(transactionRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server listening in port ${port}`));