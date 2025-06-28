"use client";

import React from "react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <h1 className="text-4xl font-bold text-indigo-700 mb-6">About SnapShows</h1>

      {/* About Project */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🛠 What is SnapShows?</h2>
        <p className="text-gray-600 leading-relaxed">
          SnapShows is a modern web application built to simplify the way creators, developers, and
          product managers create interactive product demos. Inspired by tools like Arcade, it lets
          users record workflows, upload screenshots, add step-by-step annotations, and publish
          shareable walkthroughs of their products — all from the browser.
        </p>
      </section>

      {/* Tech Stack */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🧰 Technologies Used</h2>
        <ul className="list-disc ml-6 text-gray-700 leading-relaxed">
          <li>
            <strong>Frontend:</strong> Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion
          </li>
          <li>
            <strong>Backend:</strong> Node.js, Express (REST API), MongoDB (Mongoose)
          </li>
          <li>
            <strong>Authentication:</strong> Clerk (OAuth-ready, JWT-based)
          </li>
          <li>
            <strong>Hosting:</strong> Vercel (Frontend), Render/Railway (Backend)
          </li>
        </ul>
      </section>

      {/* About Me */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">👨‍💻 About Me</h2>
        <p className="text-gray-600 leading-relaxed">
          Hey, I’m <strong>Sayan Kundu</strong> — a passionate Full Stack Developer and final-year
          Computer Science student from Kolkata, India. I love turning ideas into fully functional
          products using modern technologies. SnapShows is part of my internship task, but also a
          showcase of how I approach UI/UX, developer experience, and real-world features like
          authentication, CRUD, and media handling.
        </p>
      </section>

      {/* Links */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">🔗 Useful Links</h2>
        <ul className="list-disc ml-6 text-indigo-700">
          <li>
            <a
              href="https://github.com/sayank22/SnapShows"
              target="_blank"
              className="hover:underline"
              rel="noopener noreferrer"
            >
              GitHub Repository
            </a>
          </li>
          <li>
            <a
              href="https://budget-buddy-phi-jet.vercel.app/"
              target="_blank"
              className="hover:underline"
              rel="noopener noreferrer"
            >
              Another Project: BudgetBuddy
            </a>
          </li>
          <li>
            <Link href="/dashboard" className="hover:underline">
              Go to Dashboard
            </Link>
          </li>
        </ul>
      </section>

      {/* Footer Quote */}
      <div className="border-t pt-6 text-center text-gray-500 text-sm">
        <p>
          Built with ❤️ using modern web technologies. Feedback and collaboration are always
          welcome!
        </p>
      </div>
    </main>
  );
}
