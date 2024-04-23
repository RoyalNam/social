import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import router from "./routes/index.mjs";
import dotenv from "dotenv";
import { app, server } from "./socket/socket.mjs";
// import admin from "firebase-admin";
// import config from './config/firebase.mjs'
dotenv.config();

mongoose
  .connect("mongodb://localhost/MXH1")
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(`Error: ${err}`));

app.use(
  cors({
    origin: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: "*",
    credentials: true,
  })
);
// app.options('*', cors());

app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "hieu is the dev",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

app.use(passport.initialize());
app.use(passport.session());
app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello World" });
});

app.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Running on Port: ${port}`);
});

  
//   admin.initializeApp(config.firebaseConfig);
  
//   const bucket = admin.storage().bucket();
  
//   app.post("/uploadImage", async (req, res) => {
//     try {
//       const base64Data = req.body.image; // Lấy chuỗi base64 của ảnh từ body của yêu cầu POST
//       console.log(typeof base64Data);
//       const imageBuffer = Buffer.from(base64Data, "base64");
  
//       // Tạo tên ngẫu nhiên cho tệp ảnh
//       const imageName = `${Date.now()}_${Math.random()
//         .toString(36)
//         .substring(2, 15)}.jpg`;
  
//       // Tạo tệp ảnh tạm thời trong thư mục /tmp
//       const tempFilePath = `/tmp/${imageName}`;
//       await require("fs").promises.writeFile(tempFilePath, imageBuffer);
  
//       // Tải tệp ảnh lên Firebase Storage
//       await bucket.upload(tempFilePath, {
//         destination: `images/${imageName}`,
//         metadata: {
//           contentType: "image/jpeg", // Loại ảnh (có thể thay đổi tùy vào loại ảnh)
//         },
//       });
  
//       // Xóa tệp ảnh tạm thời
//       await require("fs").promises.unlink(tempFilePath);
  
//       // Trả về URL của ảnh đã tải lên
//       const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/images%2F${imageName}?alt=media`;
  
//       res.status(200).json({ imageUrl });
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       res.status(500).json({ error: "Something went wrong" });
//     }
//   });
