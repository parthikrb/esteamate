import mongoose from 'mongoose';

interface ReleaseAttributes {
    id?: string;
    release_name: string;
    start_date: Date;
    end_date: Date;
}

interface ReleaseDocument extends mongoose.Document {
    release_name: string;
    start_date: Date;
    end_date: Date;
}

interface ReleaseModel extends mongoose.Model<ReleaseDocument> {
    build(releaseAttributes: ReleaseAttributes): ReleaseDocument;
}

const releaseSchema = new mongoose.Schema({
    release_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
}, {
    versionKey: false
});

releaseSchema.statics.build = (releaseAttributes: ReleaseAttributes) => {
    return new Release({
        ...releaseAttributes, _id: releaseAttributes.id
    });
}

const Release = mongoose.model<ReleaseDocument, ReleaseModel>('Release', releaseSchema);

export { Release };