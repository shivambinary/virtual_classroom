import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(register(form));

    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  useEffect(() => {
    return () => dispatch(clearError());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-300">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-3 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-400 outline-none"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-purple-600 font-medium">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;