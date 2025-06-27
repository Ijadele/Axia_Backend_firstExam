const mongoose = require("mongoose");

const kycSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        requeired: true,
        unique: true,
        ref: "User",
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    governmentIdType: {
      type: String,
      enum: ["NIN", "Passport", "Driver's License", "Voter's Card"],
      required: true,
    },
    governmentIdNumber: {
      type: String,
      required: true,
    },
    documentUrl: {
      type: String, // e.g., a file upload link or cloud storage URL
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
}, {timestamps: true})

const kycModel = mongoose.model("Kyc", kycSchema)

module.exports = kycModel;