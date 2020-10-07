import mongoose from "mongoose";

interface LeaveAttributes {
  id?: string;
  user: string;
  username: string;
  role: string;
  date: Date;
}

interface LeaveDocument extends mongoose.Document {
  user: string;
  username: string;
  role: string;
  date: Date;
}

interface LeaveModel extends mongoose.Model<LeaveDocument> {
  build(leaveAttributes: LeaveAttributes): LeaveDocument;
}

const leaveSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

leaveSchema.statics.build = (leaveAttributes: LeaveAttributes) => {
  return new Leave(leaveAttributes);
};

leaveSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Leave = mongoose.model<LeaveDocument, LeaveModel>("Leave", leaveSchema);

export { Leave };
