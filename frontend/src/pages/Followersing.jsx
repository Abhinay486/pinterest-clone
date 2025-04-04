import axios from "axios";
import { useState, useEffect } from "react";

const Followersing = ({ user, followers, following, onClose }) => {
  const [followerNames, setFollowerNames] = useState({});
  const [followingNames, setFollowingNames] = useState({});

  useEffect(() => {
    const fetchNames = async (ids, setNames) => {
      const namesMap = {};
      await Promise.all(
        ids.map(async (id) => {
          try {
            const res = await axios.get(`/api/user/${id}`);
            namesMap[id] = res.data.name;
          } catch (error) {
            console.error(`Error fetching user ${id}:`, error);
            namesMap[id] = "Unknown";
          }
        })
      );
      setNames(namesMap);
    };

    fetchNames(followers, setFollowerNames);
    fetchNames(following, setFollowingNames);

    // Disable background scroll
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [followers, following]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl max-h-[80vh] overflow-y-auto p-6">
  
      <div className="grid grid-cols-2 gap-6">
        {/* Followers Section */}
        <div className="p-4 border-r-[3px] border-violet-200">
          <h3 className="text-xl font-semibold text-gray-700 text-center">Followers</h3>
          <ul className="mt-3 space-y-2">
            {followers.length > 0 ? (
              followers.map((f) => (
                <li
                  key={f}
                  className="text-gray-700 bg-gray-100 px-4 py-2 rounded-md text-center"
                >
                  {followerNames[f] || (
                    <span className="text-gray-400 italic">Loading...</span>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-3xl text-center italic">-</p>
            )}
          </ul>
        </div>
  
        {/* Following Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 text-center">Following</h3>
          <ul className="mt-3 space-y-2">
            {following.length > 0 ? (
              following.map((f) => (
                <li
                  key={f}
                  className="text-gray-700 bg-gray-100 px-4 py-2 rounded-md text-center"
                >
                  {followingNames[f] || (
                    <span className="text-gray-400 italic">Loading...</span>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center italic">Not following anyone</p>
            )}
          </ul>
        </div>
      </div>
  
      {/* Close Button */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={onClose}
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 font-semibold rounded-lg text-sm px-6 py-2.5 transition duration-200 w-full"
        >
          Close
        </button>
      </div>
      
    </div>
  </div>
  
  );
};

export default Followersing;
