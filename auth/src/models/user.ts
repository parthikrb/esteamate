import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttributes {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    role: string;
    isAdmin: boolean;
}

interface UserDocument extends mongoose.Document {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    role: string;
    isAdmin: boolean;
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attributes: UserAttributes): UserDocument;
}

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };