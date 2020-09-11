import mongoose from "mongoose";

interface RetroAttributes {
  sprint: string;
  description: string;
  classification: string;
  created_by: string;
  updated_by: string;
  resolved: boolean;
}

interface RetroDocument extends mongoose.Document {
  sprint: string;
  description: string;
  classification: string;
  created_by: string;
  updated_by: string;
  resolved: boolean;
}

interface RetroModel extends mongoose.Model<RetroDocument> {
  build(retroAttributes: RetroAttributes): RetroDocument;
}

const retroSchema = new mongoose.Schema(
  {
    sprint: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sprint",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      default: null,
    },
    updated_by: {
      type: String,
      default: null,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

retroSchema.statics.build = (retroAttributes: RetroAttributes) => {
  return new Retro(retroAttributes);
};

retroSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Retro = mongoose.model<RetroDocument, RetroModel>("Retro", retroSchema);

export { Retro };
