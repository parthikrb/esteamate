import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { json } from 'body-parser';

// Set Cookie
import cookieSession from 'cookie-session';

// DB
import mongoose from 'mongoose';

// Routes
import { SignupRouter } from './routes/signup';
import { SigninRouter } from './routes/signin';
import { SignoutRouter } from './routes/signout';
import { CurrentuserRouter } from './routes/current-user';

// Error Handlers
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { DatabaseConnectionError } from './errors/database-connection-error';

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

// Routes
app.use(CurrentuserRouter);
app.use(SigninRouter);
app.use(SignoutRouter);
app.use(SignupRouter);

app.all('*', (req, res) => {
    throw new NotFoundError();
})

app.use(errorHandler);


const startApp = async () => {

    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect('mongodb://auth-mongo-service:27017/auth', {
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