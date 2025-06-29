"use client";

import React, { useEffect, useState } from "react";

type TourMedia = {
  _id: string;
  title: string;
  description: string;
  mimetype: string;
  url: string;
};

export default function DashboardPage() {
  const [tours, setTours] = useState<TourMedia[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tours`);
        const data = await res.json();
        setTours(data);
      } catch (err) {
        console.error("Failed to fetch tours:", err);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">All Uploaded Tours</h1>
      <p className="text-gray-700 mb-6">
        Browse all uploaded media from every user.
      </p>

      {tours.length === 0 ? (
        <p>No tours available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold truncate mb-1">{tour.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{tour.description}</p>

              {tour.mimetype.startsWith("image") ? (
                <img
                  src={tour.url}
                  alt={tour.title}
                  className="w-full aspect-video object-cover rounded"
                />
              ) : (
                <video controls className="w-full h-48 object-cover rounded">
                  <source src={tour.url} type={tour.mimetype} />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
