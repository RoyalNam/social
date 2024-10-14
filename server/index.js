import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import config from './src/config/firebase';
import router from './src/routes/index.mjs';
import { app, server } from './src/socket/socket';

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log('Connected to database'))
    .catch((err) => {
        console.log(`Error: ${err}`);
        process.exit(1);
    });

app.use(
    cors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: '*',
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'fallbackSecret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
        },
        store: MongoStore.create({
            clientPromise: mongoose.connection.asPromise().then((conn) => conn.getClient()), // Sử dụng clientPromise
        }),
    }),
);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(passport.initialize());
app.use(passport.session());

initializeApp(config.firebaseConfig);

app.get('/', (request, response) => {
    console.log(request.session);
    request.session.visited = true;
    response.status(201).send({ msg: 'Hello World' });
});

app.use(router);

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const host = 'localhost';

server.listen(port, () => {
    console.log(`Server running on ${protocol}://${host}:${port}`);
});
