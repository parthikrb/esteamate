import mongoose from "mongoose";

interface SprintAttributes {
  id?: string;
  sprint_name: string;
  start_date: Date;
  end_date: Date;
}

interface SprintDocument extends mongoose.Document {
  sprint_name: string;
  start_date: Date;
  end_date: Date;
}

interface SprintModel extends mongoose.Model<SprintDocument> {
  build(sprintAttributes: SprintAttributes): SprintDocument;
}

const sprintSchema = new mongoose.Schema(
  {
    sprint_name: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

sprintSchema.statics.build = (sprintAttributes: SprintAttributes) => {
  return new Sprint({
    ...sprintAttributes,
    _id: sprintAttributes.id,
  });
};

sprintSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Sprint = mongoose.model<SprintDocument, SprintModel>(
  "Sprint",
  sprintSchema
);

export { Sprint };
