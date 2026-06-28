import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { enrollInClass } from "../../features/enrollment/enrollmentSlice";

const ClassCard = ({ cls }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleClick = () => {
    navigate(`/class/${cls._id}`);
  };

  const handleEnroll = (e) => {
    e.stopPropagation();
    dispatch(enrollInClass(cls._id));
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{cls.name}</h3>

      <p className="text-sm text-gray-600 mt-1">
        {cls.description}
      </p>

      {user?.role === "student" && (
        <button
          onClick={handleEnroll}
          className="mt-3 text-sm text-green-600 font-medium"
        >
          Request Join
        </button>
      )}
    </div>
  );
};

export default ClassCard;