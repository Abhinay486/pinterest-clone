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
            namesMap[id] = "Unknown"; // Fallback name
          }
        })
      );
      setNames(namesMap);
    };

    fetchNames(followers, setFollowerNames);
    fetchNames(following, setFollowingNames);
  }, [followers, following]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl max-w-lg w-full mx-auto relative">
      {/* Followers Section */}
      <h2 className="text-2xl font-bold text-center text-gray-800">{user.name}'s Followers</h2>
      <ul className="mt-3 space-y-2">
        {followers.length > 0 ? (
          followers.map((f) => (
            <li key={f} className="text-gray-700 bg-gray-100 px-4 py-2 rounded-md text-center">
              {followerNames[f] || <span className="text-gray-400 italic">Loading...</span>}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">No followers</p>
        )}
      </ul>

      {/* Following Section */}
      <h2 className="text-2xl font-bold text-center text-gray-800 mt-6">{user.name}'s Following</h2>
      <ul className="mt-3 space-y-2">
        {following.length > 0 ? (
          following.map((f) => (
            <li key={f} className="text-gray-700 bg-gray-100 px-4 py-2 rounded-md text-center">
              {followingNames[f] || <span className="text-gray-400 italic">Loading...</span>}
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">Not following anyone</p>
        )}
      </ul>

      {/* Close Button - Positioned at the Bottom */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={onClose} 
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-semibold rounded-lg text-sm px-6 py-2.5 transition duration-200 w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Followersing;
