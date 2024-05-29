import express from "express";
import routerAuth from "./routes/AuthRoutes.js";
import routerPost from "./routes/PostRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerAuth);
app.use("/api", routerPost);

// Error 404
app.use((req, res, next) => {
  res.send({ error: "Error 404 Not Found" });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT} ....`));
