import mongoose from 'mongoose';

interface ReleaseAttributes {
    squad: string;
    release_name: string;
    start_date: Date;
    end_date: Date;
    dev_reserve: number;
    qa_reserve: number;
    ba_reserve: number;
    is_release_reserve: boolean;
}

interface ReleaseDocument extends mongoose.Document {
    squad: string;
    release_name: string;
    start_date: Date;
    end_date: Date;
    dev_reserve: number;
    qa_reserve: number;
    ba_reserve: number;
    is_release_reserve: boolean;
}


interface ReleaseModel extends mongoose.Model<ReleaseDocument> {
    build(releaseAttributes: ReleaseAttributes): ReleaseDocument;
}


const releaseSchema = new mongoose.Schema({
    squad: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Squad',
        required: true
    },
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
    },
    dev_reserve: {
        type: Number,
        required: true
    },
    qa_reserve: {
        type: Number,
        required: true
    },
    ba_reserve: {
        type: Number,
    },
    is_release_reserve: {
        type: Boolean,
        required: true
    }
}, {
    versionKey: false
});

releaseSchema.statics.build = (releaseAttributes: ReleaseAttributes) => {
    return new Release(releaseAttributes);
}

releaseSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
    }
});

const Release = mongoose.model<ReleaseDocument, ReleaseModel>('Release', releaseSchema);

export { Release };