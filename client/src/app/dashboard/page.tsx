"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

type TourMedia = {
  _id: string;
  title: string;
  description: string;
  mimetype: string;
  url: string;
};

export default function DashboardPage() {
  const [tours, setTours] = useState<TourMedia[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tours`);
        if (!res.ok) throw new Error("Failed to fetch tours");
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
        setMessage("Failed to load tours. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Sharable link copied to clipboard.");
    } catch {
      setMessage("Failed to copy link.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">All Uploaded Tours</h1>
      <p className="text-gray-700 mb-6">
        Browse all uploaded media from every user.
      </p>

      {message && (
        <div className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded text-sm">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading tours...</p>
      ) : tours.length === 0 ? (
        <p>No tours available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold truncate mb-1">{tour.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{tour.description}</p>

              {tour.mimetype.startsWith("image") ? (
                
<Image
  src={tour.url}
  alt="tour media"
  width={800}
  height={450}
  className="w-full aspect-video object-cover rounded"
  onError={(e) => {
    const target = e.currentTarget as HTMLImageElement;
    target.src = "/fallback.jpg";
  }}
/>
              ) : (
                <video
                  controls
                  className="w-full aspect-video object-cover rounded"
                  onError={(e) => {
                    e.currentTarget.poster = "/fallback.jpg";
                  }}
                >
                  <source src={tour.url} type={tour.mimetype} />
                  Your browser does not support the video tag.
                </video>
              )}

              <button
                className="text-sm text-indigo-600 hover:underline mt-2"
                onClick={() => handleCopyLink(tour.url)}
              >
                Copy Sharable Link
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
