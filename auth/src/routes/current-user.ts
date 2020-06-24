import express from 'express';
import { User } from '../models/user'

const router = express.Router();

router.get('/api/users/currentuser', async (req, res) => {

    const users = await User.find().exec();
    res.send(`Currentuser - ${users}`)
});

export { router as CurrentuserRouter };