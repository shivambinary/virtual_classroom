import { useDispatch, useSelector } from "react-redux";
import { startLiveSession } from "../../features/session/sessionSlice";

const SessionCard = ({ session }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isLive = session.state === "live";

  const handleStart = async () => {
    const res = await dispatch(startLiveSession(session._id));

    if (res.payload?.meetingLink) {
      window.open(res.payload.meetingLink, "_blank");
    }
  };

  const handleJoin = () => {
    if (session.meetingLink) {
      window.open(session.meetingLink, "_blank");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow border hover:shadow-md transition">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium text-sm">
          {new Date(session.scheduledAt).toLocaleString()}
        </p>

        {isLive && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            🔴 Live
          </span>
        )}
      </div>

      {/* Status */}
      <p className="text-xs text-gray-500 capitalize">
        Status: {session.state}
      </p>

      {/* Actions */}
      <div className="mt-4">

        {user?.role === "teacher" ? (
          isLive ? (
            <button
              onClick={handleJoin}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
            >
              Join Live Class
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
            >
              Start Class
            </button>
          )
        ) : (
          <button
            onClick={handleJoin}
            disabled={!isLive}
            className={`w-full px-4 py-2 rounded text-white ${
              isLive
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isLive ? "Join Live Class" : "Not Live Yet"}
          </button>
        )}

      </div>
    </div>
  );
};

export default SessionCard;