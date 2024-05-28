import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();
const prisma = new PrismaClient();
const PORT = 5000;

app.use(express.json());

app.get("/", async (req, res) => {
  return res.send("hello world");
});

app.listen(PORT, () => console.log(`server is running on port ${PORT} ....`));
