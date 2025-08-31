import React from "react";

// // LoadingSkeleton.jsx
export default function LoadingSkeleton({ rows = 4, columns = 3 }) {
  return (
    <div className="p-6 space-y-4">
    {[...Array(rows)].map((_, index) => (
      <div
        key={index}
        className="h-20 bg-gray-200 rounded-lg relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      </div>
    ))}
  </div>
  );
}
