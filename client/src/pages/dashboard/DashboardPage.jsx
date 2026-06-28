import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, addClass } from "../../features/class/classSlice";

import ClassCard from "../../components/classroom/ClassCard";

const DashboardPage = () => {
  const dispatch = useDispatch();

  const { classes, loading } = useSelector((state) => state.class);
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleCreate = (e) => {
    e.preventDefault();

    dispatch(addClass(form));

    setShowModal(false);
    setForm({ name: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {user?.role === "teacher" ? "My Classes" : "All Classes"}
        </h1>

        {user?.role === "teacher" && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            + Create Class
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-gray-600">Loading classes...</p>
      )}

      {/* Empty State */}
      {!loading && classes.length === 0 && (
        <p className="text-gray-500">
          No classes found.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <ClassCard key={cls._id} cls={cls} />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">

            <h2 className="text-xl font-semibold mb-4">
              Create Class
            </h2>

            <form onSubmit={handleCreate} className="space-y-3">

              <input
                type="text"
                placeholder="Class name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <div className="flex justify-end gap-2 pt-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1 text-gray-600"
                >
                  Cancel
                </button>

                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Create
                </button>

              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;