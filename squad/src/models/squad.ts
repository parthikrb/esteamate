import mongoose from 'mongoose';
import { UserDocument, userSchema } from './user'

interface SquadAttributes {
    squad_name: string;
    product_owner: string[];
    scrum_master: string[];
    scrum_team: string[];
}

export interface SquadDocument extends mongoose.Document {
    squad_name: string;
    product_owner: string[];
    scrum_master: string[];
    scrum_team: string[];
}

interface SquadModel extends mongoose.Model<SquadDocument> {
    build(squadAttributes: SquadAttributes): SquadDocument;
}

const squadSchema = new mongoose.Schema({
    squad_name: {
        type: String,
        required: true
    },
    product_owner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    scrum_master: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    scrum_team: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
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