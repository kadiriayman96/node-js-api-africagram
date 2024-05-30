import express from "express";
import routerAuth from "./routes/AuthRoutes.js";
import routerPost from "./routes/PostRoutes.js";
import routerStatistics from "./routes/StatisticsRoutes.js";
import routerProfile from "./routes/ProfileRoutes.js";
import routerUser from "./routes/UserRoutes.js";
import routerLikes from "./routes/LikesRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routerAuth);
app.use("/api", routerPost);
app.use("/api", routerStatistics);
app.use("/api", routerProfile);
app.use("/api", routerUser);
app.use("/api", routerLikes);
// Error 404
app.use((req, res) => {
  res.send({ error: "Error 404 Not Found" });
});

app.listen(PORT, () => console.log(`server is running on port ${PORT} ....`));
