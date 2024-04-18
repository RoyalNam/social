import express, { request, response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import './config/passport.mjs';
import authRoute from './routes/auth.mjs';
import userRouter from './routes/users.mjs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

mongoose
    .connect('mongodb://localhost/MXH')
    .then(() => console.log('connect to database'))
    .catch((err) => console.log(`Error: ${err}`));

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
    session({
        secret: 'hieu is the dev',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    }),
);
app.use(
    cors({
        origin: 'http://localhost:3001',
        methods: 'GET,POST,PUT,DELETE',
        // allowedHeaders: '*',
        exposedHeaders: ['Access-Control-Allow-Credentials'],
        credentials: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoute);
app.use(userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Running on Port: ${port}`);
});

app.get('/', (request, response) => {
    console.log(request.session);
    console.log(request.session.id);
    request.session.visited = true;
    response.cookie('hello', 'world', { maxAge: 30000, signed: true });
    response.status(201).send({ msg: 'Hello World' });
});

// app.post('/api/auth', passport.authenticate('local'), (request, response) => {
//     response.sendStatus(200);
// });
