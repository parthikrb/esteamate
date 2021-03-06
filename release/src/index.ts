import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';

// Set Cookie
import cookieSession from 'cookie-session';

// DB
import mongoose from 'mongoose';

// Routes
import { createReleaseRouter } from './routes/new';
import { showReleaseRouter, } from './routes/show';
import { updateReleaseRouter, } from './routes/update';
import { showAllReleaseRouter } from './routes/index';
import { deleteReleaseRouter, } from './routes/delete';

// Error Handlers
import {
    NotFoundError,
    errorHandler,
    DatabaseConnectionError,
    currentUser,
    natsWrapper
} from '@parthikrb/common'
import { SquadCreatedListener } from './events/listeners/squad-created-listener';
import { SquadUpdatedListener } from './events/listeners/squad-updated-listener';

const app = express();
app.use(cors());

app.set('trust proxy', true) // trust first proxy

app.use(json());

// Set Cookie in response
app.use(cookieSession({
    name: 'session',
    secure: true,
    signed: false,
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(currentUser);

// Routes
app.use(createReleaseRouter);
app.use(showAllReleaseRouter);
app.use(showReleaseRouter);
app.use(updateReleaseRouter);
app.use(deleteReleaseRouter);

app.all('*', (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);


const startApp = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO URI should be defined');
    }
    if (!process.env.NATS_CLIENT_ID) {
        throw new Error('NATS_CLIENT_ID must be defined');
    }
    if (!process.env.NATS_URL) {
        throw new Error('NATS_URL must be defined');
    }
    if (!process.env.NATS_CLUSTER_ID) {
        throw new Error('NATS_CLUSTER_ID must be defined');
    }


    try {
        await natsWrapper.connect(
            process.env.NATS_CLUSTER_ID!,
            process.env.NATS_CLIENT_ID!,
            process.env.NATS_URL!
        );
        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        // listeners
        new SquadCreatedListener(natsWrapper.client).listen();
        new SquadUpdatedListener(natsWrapper.client).listen();


        await mongoose.connect(process.env.MONGO_URI!, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        }).catch(err => {
            console.error(err.message);
            throw new DatabaseConnectionError(err.message);
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error(err.message);
    }
    app.listen(3000, () => {
        console.log(`Listening on PORT 3000`);
    });
}

startApp();