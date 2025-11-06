import subjectModel from "../models/subjectModel.js";
import moduleModel from "../models/moduleModel.js";
import submoduleModel from "../models/submoduleModel.js";

export const getSubjects = async (req, res) => {
  try {
    const { year } = req.query;
    const filter = year ? { year } : {};
    const subjects = await subjectModel.find(filter).lean();
    res.json({ success: true, data: subjects });
  } catch (err) {
    console.error("Error fetching subjects:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get modules for a subject + their submodules
export const getModulesForSubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const modules = await moduleModel
      .find({ subject: subjectId })
      .sort("order")
      .lean();

    const modulesWithSubmodules = await Promise.all(
      modules.map(async (mod) => {
        const submodules = await submoduleModel
          .find({ module: mod._id })
          .sort("order")
          .lean();
        return { ...mod, submodules };
      })
    );

    res.json({ success: true, data: modulesWithSubmodules });
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get details of a single submodule
export const getSubmodule = async (req, res) => {
  try {
    const { submoduleId } = req.params;
    const sub = await submoduleModel.findById(submoduleId).lean();

    if (!sub) {
      return res.json({ success: false, message: "Submodule not found" });
    }

    res.json({ success: true, data: sub });
  } catch (err) {
    console.error("Error fetching submodule:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const saveUserSelection = async (req, res) => {
  try {
    const { subjectId, moduleId } = req.body;

    if (!subjectId || !moduleId) {
      return res.status(400).json({ success: false, message: "subjectId and moduleId are required" });
    }

    console.log("User selected:", { subjectId, moduleId });

    // Example placeholder: forward to ML model later
    // const mlResponse = await axios.post("http://ml-model-service/predict", { subjectId, moduleId });

    res.json({
      success: true,
      message: "Selection received successfully",
      data: { subjectId, moduleId },
    });
  } catch (err) {
    console.error("Error saving user selection:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
