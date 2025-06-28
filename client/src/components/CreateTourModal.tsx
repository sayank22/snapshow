"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CreateTourModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setMedia(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!media || !title.trim() || !description.trim() || !user) {
      alert("Please fill in all fields and select a file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", media);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("userId", user.id);

    try {
      const res = await fetch("http://localhost:5000/api/tours", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      console.log("Uploaded:", data);
      alert("Tour created and uploaded successfully!\nSharable link: " + window.location.origin + "/tour/" + data._id);
      onClose(); // Close modal after successful upload
      setMedia(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-96 space-y-4 shadow-lg">
        <h2 className="text-xl font-bold">Create and Upload Tour</h2>

        <input
          type="text"
          placeholder="Tour Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Tour Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Tour"}
        </button>

        <button
          className="text-sm text-gray-500 hover:text-gray-800"
          onClick={onClose}
          disabled={uploading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
