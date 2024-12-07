import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import router from './src/routes/index.js';
import { app, server } from './src/socket/socket.js';
import { config } from './src/config/config.js';

const port = config.port || 8080;

mongoose
    .connect(config.mongoDBUrl)
    .then(() => console.log('Connected to database'))
    .catch((err) => {
        console.log(`Error: ${err}`);
        process.exit(1);
    });

app.use(
    cors({
        origin: true,
        methods: 'GET,POST,PUT,DELETE,PATCH',
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: '*',
        credentials: true,
    }),
);

app.use(express.json());
app.use(cookieParser(config.cookieSecret || 'fallbackSecret'));
app.use(
    session({
        secret: config.sessionSecret || 'fallbackSecret',
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
            secure: config.nodeEnv === 'production',
            httpOnly: true,
        },
        store: MongoStore.create({
            clientPromise: mongoose.connection.asPromise().then((conn) => conn.getClient()),
        }),
    }),
);

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (request, response) => {
    console.log(request.session);
    request.session.visited = true;
    response.status(200).send({ msg: 'Hello World' });
});

app.use('/api', router);

if (config.nodeEnv === 'production') {
    app.set('trust proxy', 1);
}

server.listen(port, () => {
    console.log(`Server running on ${config.serverUrl}`);
});
