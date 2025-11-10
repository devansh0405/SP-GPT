import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch unread notifications
  const fetchUnread = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gmail/unread", {
        headers: { token },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Mark individual message as read
  const markAsRead = async (messageId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/gmail/mark-read",
        { messageId },
        { headers: { token } }
      );
      setNotifications((prev) =>
        prev.filter((msg) => msg.id !== messageId)
      );
    } catch (err) {
      console.error("Error marking read:", err.message);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (notifications.length === 0) return;
    setMarkingAll(true);
    try {
      await axios.post(
        "http://localhost:3000/api/gmail/mark-all-read",
        {},
        { headers: { token } }
      );
      setNotifications([]);
    } catch (err) {
      console.error("Error marking all as read:", err.message);
    } finally {
      setMarkingAll(false);
    }
  };

  useEffect(() => {
    fetchUnread();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading notifications...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Unread Gmail Notifications</h1>
        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            disabled={markingAll}
            className={`px-4 py-3 text-sm font-semibold text-white rounded-lg transition ${
              markingAll
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {markingAll ? "Marking..." : "Mark All as Read"}
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No unread notifications 🎉</p>
      ) : (
        <div className="bg-white rounded-2xl shadow p-4 divide-y divide-gray-200">
          {notifications.map((msg) => (
            <div
              key={msg.id}
              className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg"
            >
              <div>
                <p className="text-sm text-gray-600 font-semibold">
                  {msg.from}
                </p>
                <p className="text-base font-medium text-gray-800">
                  {msg.subject}
                </p>
                <p className="text-xs text-gray-500">{msg.date}</p>
              </div>
              <button
                onClick={() => markAsRead(msg.id)}
                className="ml-4 px-3 py-2 text-sm text-white bg-green-500 hover:bg-green-600 rounded-lg"
              >
                Mark as Read
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
