"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

interface Tour {
  _id: string;
  userId: string;
  title: string;
  description: string;
  mimetype: string;
  url: string;
}

export default function ProfilePage() {
  const { user } = useUser();
  const [tours, setTours] = useState<Tour[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserTours = async () => {
      if (!user) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tours/user/${user.id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTours(data);
      } catch (error) {
        console.error("Failed to fetch user tours:", error);
        setMessage("Error fetching tours.");
      }
    };

    fetchUserTours();
  }, [user]);

  const handleDelete = async (tourId: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tours/${tourId}`, {
        method: "DELETE",
      });
      setTours((prev) => prev.filter((tour) => tour._id !== tourId));
      setMessage("Tour deleted successfully.");
    } catch (err) {
      console.error("Failed to delete tour:", err);
      setMessage("Failed to delete tour.");
    }
  };

  const startEditing = (tour: Tour) => {
    setEditingId(tour._id);
    setEditTitle(tour.title);
    setEditDescription(tour.description);
    setMessage("");
  };

  const handleUpdate = async (tourId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tours/${tourId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editTitle,
          description: editDescription,
        }),
      });

      if (!res.ok) throw new Error("Failed to update");

      setTours((prev) =>
        prev.map((t) =>
          t._id === tourId ? { ...t, title: editTitle, description: editDescription } : t
        )
      );
      setEditingId(null);
      setMessage("Tour updated successfully.");
    } catch (err) {
      console.error("Update failed:", err);
      setMessage("Failed to update tour.");
    }
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setMessage("Sharable link copied!");
    } catch {
      setMessage("Failed to copy link.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <p className="text-gray-700 mb-6">
        Logged in as: <strong>{user?.fullName || user?.emailAddresses[0]?.emailAddress}</strong>
      </p>

      {message && (
        <div className="mb-4 px-4 py-2 bg-blue-100 text-blue-800 rounded text-sm">
          {message}
        </div>
      )}

      {!user ? (
        <p>Loading user...</p>
      ) : tours.length === 0 ? (
        <p>No tours uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tours.map((tour) => (
            <div key={tour._id} className="bg-white rounded shadow p-4">
              {editingId === tour._id ? (
                <>
                  <input
                    className="w-full mb-2 p-2 border rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    placeholder="Edit title"
                  />
                  <textarea
                    className="w-full mb-2 p-2 border rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    placeholder="Edit description"
                    rows={3}
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <button
                      className="text-green-600 hover:underline disabled:text-gray-400"
                      onClick={() => handleUpdate(tour._id)}
                      disabled={!editTitle.trim() || !editDescription.trim()}
                    >
                      Save
                    </button>
                    <button
                      className="text-gray-500 hover:underline"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold mb-1">{tour.title}</h2>
                  <p className="text-sm text-gray-600 mb-2">{tour.description}</p>

                  {tour.mimetype.startsWith("image") ? (
                    <img
                      src={tour.url}
                      alt="tour media"
                      className="w-full aspect-video object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/fallback.jpg"; // optional fallback
                      }}
                    />
                  ) : (
                    <video
                      src={tour.url}
                      controls
                      className="w-full aspect-video object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.poster = "/fallback.jpg";
                      }}
                    />
                  )}

                  <div className="flex flex-col gap-1 mt-3 text-sm">
                    <div className="flex justify-between">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => startEditing(tour)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleDelete(tour._id)}
                      >
                        Delete
                      </button>
                    </div>
                    <button
                      className="text-indigo-600 hover:underline"
                      onClick={() => handleCopyLink(tour.url)}
                    >
                      Copy Sharable Link
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
