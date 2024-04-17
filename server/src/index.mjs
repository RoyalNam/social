import express, { request, response } from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
// import "./strategies/local-strategy.mjs";
import "./strategies/discord-strategy.mjs";
import "./strategies/facebook-strategy.mjs";
import "./strategies/google-strategy.mjs";

import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose
  .connect("mongodb://localhost/MXH")
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(`Error: ${err}`));

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

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Running on Port: ${port}`);
});

app.get("/", (request, response) => {
  console.log(request.session);
  console.log(request.session.id);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 30000, signed: true });
  response.status(201).send({ msg: "Hello World" });
});

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
  console.log(`Inside /api/auth/status endpoint`);
  console.log(request.user);
  console.log(request.session);
  console.log(request.sessionID);
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logOut((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});

app.post("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  const { body: item } = request;
  const { cart } = request.session;
  if (cart) {
    cart.push(item);
  } else {
    request.session.cart = [item];
  }
  return response.status(201).send(item);
});

app.get("/api/cart", (request, response) => {
  if (!request.session.user) return response.sendStatus(401);
  return response.send(request.session.cart ?? []);
});

app.get("/api/auth/discord", passport.authenticate("discord"));

app.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord"),
  (request, response) => {
    console.log(request.session);
    console.log(request.user);

    response.sendStatus(200)
  }
);
