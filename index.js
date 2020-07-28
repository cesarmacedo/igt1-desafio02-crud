import express from "express";
import gradeRouter from "./routes/gradeRouter.js"
import logger from "./helper/winston.js"

const app = express();

app.use(express.json());
app.use("/grade", gradeRouter);

//logger().error("Error log")
// logger.warn("warn log")
// logger.info("info log")

app.listen(5000, () => {
    console.log("APi runing port:5000")
})

