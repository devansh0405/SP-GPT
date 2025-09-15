import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "subjectModel", required: true },
  name: String, // eg. "Data Structures"
  order: String
})

const moduleModel = mongoose.models.module || mongoose.model("module", moduleSchema);

export default moduleModel;