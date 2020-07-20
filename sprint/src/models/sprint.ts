import mongoose from 'mongoose';

interface SprintAttributes {
    release_name: string;
    sprint_name: string;
    start_date: Date;
    end_date: Date;
}

interface SprintDocument extends mongoose.Document {
    release_name: string;
    sprint_name: string;
    start_date: Date;
    end_date: Date;
}

interface SprintModel extends mongoose.Model<SprintDocument> {
    build(sprintAttributes: SprintAttributes): SprintDocument;
}

const sprintSchema = new mongoose.Schema({
    release_name: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    sprint_name: {
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

sprintSchema.statics.build = (sprintAttributes: SprintAttributes) => {
    return new Sprint(sprintAttributes);
}

const Sprint = mongoose.model<SprintDocument, SprintModel>('Sprint', sprintSchema);

export { Sprint };