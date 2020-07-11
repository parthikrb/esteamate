import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';

// Set Cookie
import cookieSession from 'cookie-session';

// DB
import mongoose from 'mongoose';

// Routes
import { createSquadRouter } from './routes/new';

// Error Handlers
import { NotFoundError, errorHandler, DatabaseConnectionError, currentUser } from '@parthikrb/common'

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
app.use(createSquadRouter);

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

    try {
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