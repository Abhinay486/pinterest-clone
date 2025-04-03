import React from "react";
import { logOut } from "../../../backend/controllers/userControllers";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { UserData } from "../context/UserContext";

const Account = ({ user }) => {
    const navigate = useNavigate();
    const {setIsAuth, setUser} = UserData();
  const logOutHand = async() => {
    try {
        const {data} = await axios.get("api/user/logout");
        toast.success(data.message);
        navigate("/login");
        setIsAuth(false);
        setUser([])
    } catch (error) {
        toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96 text-center border border-gray-200 mt-20">
        {/* Profile Icon */}
        <div className="flex items-center justify-center mb-4">
          <FaUserCircle className="text-gray-500 text-6xl" />
        </div>

        {/* User Info */}
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-600 text-sm mt-1">{user.email}</p>

        {/* Logout Button */}
        <button
          onClick={logOutHand}
          className="mt-6 bg-red-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
