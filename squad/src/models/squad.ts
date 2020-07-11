import mongoose from 'mongoose';
import { UserDocument, userSchema } from './user'

interface SquadAttributes {
    squad_name: string;
    product_owner: UserDocument;
    scrum_master: UserDocument;
    scrum_team: UserDocument[];
}

export interface SquadDocument extends mongoose.Document {
    squad_name: string;
    product_owner: UserDocument;
    scrum_master: UserDocument;
    scrum_team: UserDocument[];
}

interface SquadModel extends mongoose.Model<SquadDocument> {
    build(squadAttributes: SquadAttributes): SquadDocument;
}

const squadSchema = new mongoose.Schema({
    squad_name: {
        type: String,
        required: true
    },
    product_owner: {
        type: [userSchema],
        default: undefined,
        required: true
    },
    scrum_master: {
        type: [userSchema],
        default: undefined,
        required: true
    },
    scrum_team: {
        type: [userSchema],
        default: undefined,
        required: true
    }
}, {
    versionKey: false
});

squadSchema.set('toJSON', {
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
    }
});

squadSchema.statics.build = (squadAttributes: SquadAttributes) => {
    return new Squad(squadAttributes);
}

const Squad = mongoose.model<SquadDocument, SquadModel>('Squad', squadSchema);

export { Squad };