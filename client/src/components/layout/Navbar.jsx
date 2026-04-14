import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-6 py-3 flex justify-between items-center">

      {/* Left */}
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold text-blue-600 cursor-pointer"
      >
        Virtual Classroom
      </h1>

      {/* Right */}
      <div className="flex items-center gap-4">

        <div className="text-sm text-gray-600">
          <p className="font-medium">{user?.name}</p>
          <p className="text-xs capitalize">{user?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;