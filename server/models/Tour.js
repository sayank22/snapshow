import mongoose from "mongoose";

const TourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      required: true, // Cloudinary file URL
    },
    public_id: {
      type: String,
      required: true, // Cloudinary public_id needed for deletion
    },
    mimetype: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", TourSchema);
export default Tour;
