import express from "express";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import adminRoute from "./routes/adminRoute.js";
import songRoute from "./routes/songRoute.js";
import statsRoute from "./routes/statRoute.js";
import albumRoute from "./routes/albumRoute.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const __dirname = path.resolve();
app.use(express.json()); //parse req body
app.use(clerkMiddleware()); //for protected route, clerk add auth token to req obj (req.auth.userId)

//use express-fieupoad for simplicity compared to multer.js
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"), //under current folder (backend) -> create tmp folder -> hold file upload until it is uploaded to cloudinary
    createParentPath: true, //if folder does not exist -> create
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB max file size
    },
  })
);

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/songs", songRoute);
app.use("/api/albums", albumRoute);
app.use("/api/stats", statsRoute);

//error handler
app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error "
        : error.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
