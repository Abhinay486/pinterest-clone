import React from "react";

const PinCard = ({ pin }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Pin Image */}
      <img
        src={pin.image.url}
        alt={pin.title}
        className="w-full h-56 object-cover"
      />

      {/* Card Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {pin.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {pin.description}
        </p>
      </div>

      {/* Action Button */}
      <div className="absolute bottom-3 right-3">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-all">
          Save
        </button>
      </div>
    </div>
  );
};

export default PinCard;
