import mongoose from 'mongoose';

interface SquadAttributes {
    id?: string;
    squad_name: string;
}

interface SquadDocument extends mongoose.Document {
    squad_name: string;

}

interface SquadModel extends mongoose.Model<SquadDocument> {
    build(squadAttributes: SquadAttributes): SquadDocument;
}

const squadSchema = new mongoose.Schema({
    squad_name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

squadSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
    }
});

squadSchema.statics.build = (squadAttributes: SquadAttributes) => {
    return new Squad({
        ...squadAttributes, _id: squadAttributes.id
    });
}

const Squad = mongoose.model<SquadDocument, SquadModel>('Squad', squadSchema);

export { Squad };
