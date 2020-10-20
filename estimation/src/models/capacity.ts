import mongoose from "mongoose";

interface CapacityAttributes {
  sprint: string;
  story: string;
  dev_estimation: number;
  qa_estimation: number;
  ba_estimation: number;
}

export interface CapacityDocument extends mongoose.Document {
  sprint: string;
  story: string;
  dev_estimation: number;
  qa_estimation: number;
  ba_estimation: number;
}

interface CapacityModel extends mongoose.Model<CapacityDocument> {
  build(capacityAttributes: CapacityAttributes): CapacityDocument;
}

const capacitySchema = new mongoose.Schema(
  {
    sprint: {
      type: String,
      required: true,
    },
    story: {
      type: String,
      required: true,
    },
    dev_estimation: {
      type: Number,
      required: true,
    },
    qa_estimation: {
      type: Number,
      required: true,
    },
    ba_estimation: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

capacitySchema.set("toJSON", {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

capacitySchema.statics.build = (capacityAttributes: CapacityAttributes) => {
  return new Capacity(capacityAttributes);
};

const Capacity = mongoose.model<CapacityDocument, CapacityModel>(
  "Capacity",
  capacitySchema
);

export { Capacity };
