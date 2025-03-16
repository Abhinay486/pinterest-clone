import React from "react";
import { PinData } from "../context/PinContext";
import LoadingAnimationpage from "../components/Loading"; // Ensure this component exists

const Home = () => {
  const { pins, loading } = PinData();
  console.log(pins);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-wrap m-4">
            {loading ? (
              <LoadingAnimationpage />
            ) : pins && pins.length > 0 ? (
              pins.map((e, idx) => (
                <PinCard pin={e} key={idx} /> // 🔥 Fixed "tile" to "title"
              ))
            ) : (
              <p>No Pins</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
