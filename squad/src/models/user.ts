import mongoose from 'mongoose';

interface UserAttributes {
    id?: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    role: string;
    isAdmin: boolean;
    capacity_reserve: number;
}

export interface UserDocument extends mongoose.Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    role: string;
    isAdmin: boolean;
    capacity_reserve: number;
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
    },
    capacity_reserve: {
        type: Number,
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
    return new User({...attributes, _id: attributes.id});
}

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { userSchema, User };