import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SessionCard from "../../components/classroom/SessionCard";

import {
  fetchSessions,
  scheduleSession,
} from "../../features/session/sessionSlice";

import {
  fetchMaterials,
  addMaterial,
} from "../../features/material/materialSlice";

const ClassPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { sessions, loading } = useSelector((state) => state.session);
  const { materials, loading: materialLoading } = useSelector(
    (state) => state.material
  );
  const { user } = useSelector((state) => state.auth);

  const [showSessionModal, setShowSessionModal] = useState(false);
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  const [date, setDate] = useState("");

  const [materialForm, setMaterialForm] = useState({
    title: "",
    file: null,
  });

  useEffect(() => {
    dispatch(fetchSessions(id));
    dispatch(fetchMaterials(id));
  }, [dispatch, id]);

  const handleSchedule = (e) => {
    e.preventDefault();

    dispatch(
      scheduleSession({
        classId: id,
        scheduledAt: date,
      })
    );

    setShowSessionModal(false);
    setDate("");
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();

    const res = await dispatch(
      addMaterial({
        classId: id,
        title: materialForm.title,
        file: materialForm.file,
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      dispatch(fetchMaterials(id));
      setShowMaterialModal(false);
      setMaterialForm({ title: "", file: null });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Class Room</h1>

        {user?.role === "teacher" && (
          <button
            onClick={() => setShowSessionModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Schedule Session
          </button>
        )}
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">Sessions</h2>

        {loading && <p>Loading sessions...</p>}

        {!loading && sessions.length === 0 && (
          <p className="text-gray-500 text-sm">
            No sessions scheduled yet
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Materials</h2>

          {user?.role === "teacher" && (
            <button
              onClick={() => setShowMaterialModal(true)}
              className="bg-purple-600 text-white px-3 py-1 rounded"
            >
              + Upload
            </button>
          )}
        </div>

        {materials.length === 0 && (
          <p className="text-gray-500 text-sm">
            No materials uploaded yet
          </p>
        )}

        <div className="space-y-2">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="border p-3 rounded flex justify-between items-center"
            >
              <p className="font-medium">{mat.title}</p>

              <a
                href={mat.fileUrl || mat.file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                {mat.fileName || "Download"}
              </a>
            </div>
          ))}
        </div>
      </div>

      {showSessionModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Schedule Session
            </h2>

            <form onSubmit={handleSchedule}>
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-3"
                required
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                >
                  Cancel
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Material Modal */}
      {showMaterialModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-lg font-semibold mb-3">
              Upload Material
            </h2>

            <form onSubmit={handleUploadMaterial} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={materialForm.title}
                onChange={(e) =>
                  setMaterialForm({
                    ...materialForm,
                    title: e.target.value,
                  })
                }
                className="w-full border px-3 py-2 rounded"
                required
              />

              {/* File */}
              <div>
                <input
                  type="file"
                  onChange={(e) =>
                    setMaterialForm({
                      ...materialForm,
                      file: e.target.files[0],
                    })
                  }
                  className="w-full border px-3 py-2 rounded"
                  required
                />

                {materialForm.file && (
                  <p className="text-sm text-gray-500 mt-1">
                    Selected: {materialForm.file.name}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  disabled={materialLoading}
                  onClick={() => setShowMaterialModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={materialLoading}
                  className={`px-4 py-2 rounded text-white flex items-center gap-2 ${
                    materialLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {materialLoading && (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  )}
                  {materialLoading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPage;