"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Pencil,
  Eye,
  LogIn,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [viewerOpen, setViewerOpen] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-teal-400 px-6 py-12">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Welcome to <span className="text-purple-600">SnapShows</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Create, record, and share interactive product tours like never before.
        </p>
        <a
          href="/dashboard"
          className="mt-8 inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition-all duration-300"
        >
          🚀 See All Tours
        </a>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto text-gray-800 grid md:grid-cols-3 gap-10 mb-20">
        <div className="bg-purple-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border-t-4 border-purple-500">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">Upload Screenshots</h3>
          <p>Easily upload and organize screen images to build a step-by-step tour.</p>
        </div>
        <div className="bg-blue-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border-t-4 border-blue-500">
          <h3 className="text-xl font-semibold text-blue-700 mb-2">Screen Recording</h3>
          <p>Capture workflows directly from the browser to enhance clarity and impact.</p>
        </div>
        <div className="bg-green-200 p-6 rounded-xl shadow hover:shadow-lg transition duration-300 border-t-4 border-green-500">
          <h3 className="text-xl font-semibold text-green-700 mb-2">Interactive Demos</h3>
          <p>Add annotations, transitions, and preview the flow before publishing.</p>
        </div>
      </section>

      {/* Creator Section - Always Visible */}
      <section className="max-w-4xl mx-auto mb-12">
        <div className="bg-purple-100 p-6 rounded-xl shadow-xl border-l-4 border-purple-500 text-left">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4 flex items-center gap-2">
            <Pencil className="w-5 h-5 text-purple-600" /> Creator Access
          </h3>
          <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
            <li>✍️ Create your own product tours</li>
            <li>📸 Upload screenshots or screen recordings</li>
            <li>🛠️ Add annotations, reorder steps, and preview before publishing</li>
          </ul>
        </div>

        {/* Login CTA */}
        <div className="mt-4 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-2 bg-purple-600 text-white font-semibold rounded-full shadow hover:bg-purple-700 transition"
          >
            <LogIn className="w-4 h-4" />
            Login to Create a Tour
          </Link>
        </div>
      </section>

      {/* Viewer Toggle Section */}
      <section className="max-w-4xl mx-auto text-center">
        <button
          onClick={() => setViewerOpen((prev) => !prev)}
          className="px-6 py-2 rounded-full font-semibold border border-blue-600 text-blue-600 hover:bg-blue-50 transition mb-4"
        >
          <Eye className="inline w-4 h-4 mr-2" />
          {viewerOpen ? "Hide Viewer Access" : "View as Viewer"}
        </button>

        <AnimatePresence mode="wait">
          {viewerOpen && (
            <motion.div
              key="viewer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-blue-100 p-6 rounded-xl shadow-xl border-l-4 border-blue-500 text-left"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" /> Viewer Access
              </h3>
              <ul className="space-y-3 text-gray-700 text-sm leading-relaxed">
                <li>✅ Explore public product tours</li>
                <li>✅ Understand step-by-step product workflows</li>
                <li>✅ No login required</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
