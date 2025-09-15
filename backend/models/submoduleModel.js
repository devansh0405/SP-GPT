import mongoose from "mongoose";

const submoduleSchema = new mongoose.Schema({
  module: { type: mongoose.Schema.Types.ObjectId, ref: "moduleModel", required: true },
  title: String,
  content: String, // short content/notes or stored summary
 // resources: [{ type: mongoose.Schema.Types.ObjectId, ref: "Resource" }],
  order: String
})

const submoduleModel = mongoose.models.submodule || mongoose.model("submodule", submoduleSchema);

export default submoduleModel;