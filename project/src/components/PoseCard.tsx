import React from 'react';

interface PoseCardProps {
  name: string;
  duration: string;
  imageUrl: string;
  description: string;
}

export function PoseCard({ name, duration, imageUrl, description }: PoseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2">{duration}</p>
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}