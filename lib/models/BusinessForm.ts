import mongoose from "mongoose"

const BusinessFormSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    hasWebsite: { type: String, enum: ["yes", "no"], required: true },
    websiteUse: { type: String },
    businessIndustry: { type: String },
    targetAudience: { type: String },
    challenges: [{ type: String }],
    implementedStrategies: { type: String, enum: ["yes", "no"] },
    joinWishlist: { type: String, enum: ["yes", "no"] },
    wantWebsite: { type: String, enum: ["yes", "no"] },
    creationChallenges: [{ type: String }],
  },
  { timestamps: true },
)

export default mongoose.models.BusinessForm || mongoose.model("BusinessForm", BusinessFormSchema)

