import React from "react";
import { PinData } from "../context/PinContext";
import LoadingAnimationpage from "../components/Loading"; // Ensure this component exists
import PinCard from "../components/PinCard";

const Home = () => {
  const { pins, loading } = PinData();

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        {loading ? (
          <div className="flex justify-center">
            <LoadingAnimationpage />
          </div>
        ) : pins && pins.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {pins.map((e, idx) => (
              <PinCard pin={e} key={idx} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Pins Available</p>
        )}
      </div>
    </div>
  );
};

export default Home;
