import { PrismaClient } from "@prisma/client";
import express from "express";
import routerAuth from "./routes/AuthRoutes.js"

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(express.json());

app.use("/api", routerAuth)


// app.get("/",  async (req, res) => {
//   return res.send("hello world");
// });



app.listen(PORT, () => console.log(`server is running on port ${PORT} ....`));
