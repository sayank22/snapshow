"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import CreateTourModal from "./CreateTourModal";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-slate-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              SnapShows
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>

              <Link href="/about" className="hover:text-blue-600">
                About
              </Link>

              <SignedIn>
                <Link href="/profile" className="hover:text-blue-600">
                  My Profile
                </Link>
                <button
                  className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  + Create Tour
                </button>
                <UserButton
                  appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }}
                />
              </SignedIn>

              <SignedOut>
                <SignInButton>
                  <button className="px-3 py-2 text-blue-600 hover:text-blue-800">
                    Log In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="px-3 py-2 text-green-600 hover:text-green-800">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>

            {/* Mobile Hamburger Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-600 hover:text-blue-600"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link
              href="/dashboard"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>

            <Link
              href="/about"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>

            <SignedIn>
              <Link
                href="/profile"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                My Profile
              </Link>
              <button
                className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => {
                  setMenuOpen(false);
                  setIsModalOpen(true);
                }}
              >
                + Create Tour
              </button>
              <div className="pt-2">
                <UserButton
                  appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="block w-full text-left px-3 py-2 text-blue-600 hover:text-blue-800">
                  Log In
                </button>
              </SignInButton>
              <SignUpButton>
                <button className="block w-full text-left px-3 py-2 text-green-600 hover:text-green-800">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        )}
      </nav>

      {/* Modal for Create Tour */}
      <CreateTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
