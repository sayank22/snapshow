import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();
import Tour from "../models/Tour.js";

const router = express.Router();

console.log("Cloudinary config test:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "loaded" : "missing",
});

// ✅ Multer + Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "SnapShows_tours",
    allowed_formats: ["jpg", "png", "jpeg", "mp4", "mov", "webm"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// ✅ CREATE Tour
router.post("/", upload.single("file"), async (req, res) => {
  const { title, description, userId } = req.body;

  if (!title || !description || !userId || !req.file) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newTour = new Tour({
      title,
      description,
     url: req.file.path || req.file.secure_url, // updated line
      secureUrl: req.file.secure_url,  
      public_id: req.file.filename,
      mimetype: req.file.mimetype,
      userId,
    });

    await newTour.save();
    res.status(201).json(newTour);
  } catch (err) {
    console.error("Failed to create tour:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ GET all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tours" });
  }
});

// ✅ GET tours by user
router.get("/user/:userId", async (req, res) => {
  try {
    const tours = await Tour.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user tours" });
  }
});

// ✅ DELETE a tour (Cloudinary version — optional enhancement)
router.delete("/:id", async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    // ✅ Optional: delete from Cloudinary
    if (tour.filename) {
      try {
        await cloudinary.uploader.destroy(await cloudinary.uploader.destroy(tour.public_id, {
  resource_type: tour.mimetype.startsWith("video") ? "video" : "image",
})
        );
      } catch (err) {
        console.warn("Cloudinary deletion failed (ignored):", err.message);
      }
    }

    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete tour" });
  }
});

// ✅ UPDATE a tour
router.put("/:id", async (req, res) => {
  try {
    const { title, description } = req.body;
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!tour) return res.status(404).json({ error: "Tour not found" });

    res.json(tour);
  } catch (err) {
    res.status(500).json({ error: "Failed to update tour" });
  }
});

export default router;
