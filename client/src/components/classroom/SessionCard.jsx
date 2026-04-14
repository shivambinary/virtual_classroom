import { useDispatch, useSelector } from "react-redux";
import { startLiveSession } from "../../features/session/sessionSlice";

const SessionCard = ({ session }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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

  const isLive = session.state === "live";

  return (
    <div className="bg-white p-4 rounded-xl shadow border">

      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <p className="font-medium">
          {new Date(session.scheduledAt).toLocaleString()}
        </p>

        {isLive && (
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">
            🔴 Live
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500">
        Status: {session.state}
      </p>

      {/* Actions */}
      <div className="mt-4">

        {user?.role === "teacher" ? (
          isLive ? (
            <button
              onClick={handleJoin}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Join Live Class
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
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
                ? "bg-blue-600"
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