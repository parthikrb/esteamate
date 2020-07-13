import mongoose from 'mongoose';

interface UserAttributes {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    role: string;
    isAdmin: boolean;
}

export interface UserDocument extends mongoose.Document {
    firstname: string;
    lastname: string;
    username: string;
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
}, {
    versionKey: false
});


userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
    }
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { userSchema, User };