"use client";

import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
}

/**
 * Standalone, reusable, controlled search input.
 * Purely presentational/local-state for now — there is no product search
 * logic wired up since this is a read-only display, but the input is kept
 * controlled so it can be extended later without restructuring.
 */
export default function SearchBar({ placeholder = "Search products" }: SearchBarProps) {
  const [value, setValue] = useState("");

  return (
    <div className="flex w-full max-w-md items-center rounded-full bg-white px-4 py-2 shadow-md">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
        aria-label="Search products"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>
  );
}
