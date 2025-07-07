import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Calendar from "react-calendar";
import { BASE_URL } from "../config";

import "react-calendar/dist/Calendar.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [editId, setEditId] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteQuotes");
    return saved ? JSON.parse(saved) : [];
  });
  const [darkMode, setDarkMode] = useState(false);
  const [value, onChange] = useState(new Date());
  const [focusTime, setFocusTime] = useState(25 * 60);

  const token = localStorage.getItem("token");

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      toast.error("❌ Failed to fetch tasks");
    }
  }, [token]);

  const fetchUser = useCallback(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/user`, {
        headers: { Authorization: token },
      });
      setUser(res.data.email);
    } catch (err) {
      toast.error("❌ Failed to fetch user");
    }
  }, [token]);

  const fetchQuotes = async () => {
    try {
      const res = await Promise.all([
        axios.get("https://api.quotable.io/random"),
        axios.get("https://api.quotable.io/random"),
        axios.get("https://api.quotable.io/random"),
      ]);
      setQuotes(res.map((r) => r.data));
    } catch (err) {
      console.error(err);
    }
  };

  const suggestions = [
    "Plan tomorrow’s goals",
    "Review my weekly progress",
    "Drink water now",
    "Write a journal entry",
    "Read for 15 minutes",
  ];

  const handleSuggestionClick = (suggestion) => {
    setText(suggestion);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `${BASE_URL}/api/tasks/${editId}`,
          { text },
          { headers: { Authorization: token } }
        );
        toast.info("✏️ Task updated");
        setEditId(null);
      } else {
        await axios.post(
          `${BASE_URL}/api/tasks`,
          { text },
          { headers: { Authorization: token } }
        );
        toast.success("✅ Task added!");
      }
      setText("");
      fetchTasks();
    } catch {
      toast.error("❌ Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
      toast.error("🗑️ Task deleted");
    } catch {
      toast.error("❌ Deletion failed");
    }
  };

  const handleEdit = (task) => {
    setText(task.text);
    setEditId(task._id);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const addToFavorites = (quote) => {
    const updated = [...favorites, quote];
    setFavorites(updated);
    localStorage.setItem("favoriteQuotes", JSON.stringify(updated));
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    fetchTasks();
    fetchUser();
    fetchQuotes();
    axios
      .get("https://zenquotes.io/api/today")
      .catch(() => toast.error("😔 Couldn't fetch quote"));
  }, [fetchTasks, fetchUser]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    else if (hour < 18) return "Good Afternoon";
    else return "Good Evening";
  };

  const formatTime = (t) =>
    `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  };

  const weeklyData = [
    { day: "Mon", tasks: 3 },
    { day: "Tue", tasks: 5 },
    { day: "Wed", tasks: 2 },
    { day: "Thu", tasks: 4 },
    { day: "Fri", tasks: 6 },
    { day: "Sat", tasks: 3 },
    { day: "Sun", tasks: 2 },
  ];

  return (
    <div
      className={`min-h-screen p-6 ${
        darkMode ? "bg-gray-900 text-white" : "bg-blue-50 text-black"
      }`}
    >
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-5xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${user}&background=random`}
              className="w-12 h-12 rounded-full"
              alt="avatar"
            />
            <div>
              <h2 className="text-xl font-bold">
                👋 {getGreeting()},{" "}
                <span className="text-indigo-500">{user}</span>
              </h2>
              <p className="text-sm text-gray-400">
                Stay consistent and crush your goals!
              </p>
            </div>
          </div>
          <div className="space-x-3">
            <button
              onClick={toggleDarkMode}
              className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              🚪 Logout
            </button>
          </div>
        </div>

        <Slider {...settings}>
          {quotes.map((q, i) => (
            <div
              key={i}
              className="bg-yellow-100 dark:bg-yellow-200 rounded p-4 text-center"
            >
              <p className="italic">“{q.content}”</p>
              <p className="font-semibold mt-2">– {q.author}</p>
              <button
                onClick={() => addToFavorites(q)}
                className="text-sm text-indigo-600 hover:underline mt-1"
              >
                💖 Save
              </button>
            </div>
          ))}
        </Slider>

        <div className="flex flex-wrap gap-2 mb-6">
          {suggestions.map((sug, i) => (
            <button
              key={i}
              className="bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              onClick={() => handleSuggestionClick(sug)}
            >
              ✨ {sug}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-4">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="📋 Add a task..."
            className="flex-1 px-4 py-2 rounded border border-gray-300"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded"
          >
            {editId ? "✏️ Update" : "➕ Add"}
          </button>
        </form>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between bg-indigo-100 px-4 py-2 rounded"
            >
              <span>{task.text}</span>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(task)}
                  className="text-blue-600 hover:underline"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {favorites.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">📚 Favorite Quotes</h3>
            <ul className="list-disc ml-5 space-y-1">
              {favorites.map((q, i) => (
                <li key={i}>
                  “{q.content}” – <span className="italic">{q.author}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">📆 Calendar</h3>
            <Calendar onChange={onChange} value={value} className="rounded" />
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">📊 Weekly Productivity</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tasks"
                  stroke="#6366f1"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center">
          <h3 className="text-lg font-semibold mb-2">⏱️ Focus Timer (Pomodoro)</h3>
          <p className="text-3xl font-bold">{formatTime(focusTime)}</p>
          <div className="mt-4 space-x-4">
            <button
              onClick={() => setFocusTime((prev) => Math.max(0, prev - 60))}
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              -1 min
            </button>
            <button
              onClick={() => setFocusTime((prev) => prev + 60)}
              className="bg-yellow-500 text-white px-4 py-1 rounded"
            >
              +1 min
            </button>
            <button
              onClick={() => setFocusTime(25 * 60)}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
