"use client"; // <-- This must be the first line

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Calculator } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import dynamic from "next/dynamic";

// Dynamically import Retirement Calculator
const RetirementCalculator = dynamic(() => import("./RetirementCalculator"), { ssr: false });

const Header = () => {
  const [showCalculator, setShowCalculator] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src={"/logo.jpg"}
              alt="Welth Logo"
              width={250}
              height={80}
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links - Different for signed in/out users */}
          <div className="hidden md:flex items-center space-x-8">
            <SignedOut>
              <a href="#features" className="text-gray-600 hover:text-blue-600">
                Features
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600"
              >
                Testimonials
              </a>
            </SignedOut>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
              >
                <Button variant="outline">
                  <LayoutDashboard size={18} />
                  <span className="hidden md:inline">Dashboard</span>
                </Button>
              </Link>

              <a href="/transaction/create">
                <Button className="flex items-center gap-2">
                  <PenBox size={18} />
                  <span className="hidden md:inline">Add Transaction</span>
                </Button>
              </a>

              {/* Retirement Calculator Button */}
              <Button
                variant="outline"
                onClick={() => setShowCalculator(true)}
                className="flex items-center gap-2"
              >
                <Calculator size={18} />
                <span className="hidden md:inline">Retirement</span>
              </Button>
            </SignedIn>

            <SignedOut>
              <SignInButton forceRedirectUrl="/dashboard">
                <Button variant="outline">Login</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                }}
              />
            </SignedIn>
          </div>
        </nav>
      </header>

      {/* Retirement Calculator Modal */}
      {showCalculator && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full relative">
            <button
              onClick={() => setShowCalculator(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <RetirementCalculator />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

