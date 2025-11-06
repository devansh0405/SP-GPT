import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { getAssignments } from "../../services/moodleAPI";

const AcademicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("moodleToken");
        if (!token) throw new Error("No Moodle token found. Please log in first.");

        const assignments = await getAssignments(token);

        const formattedEvents = assignments.map((a) => ({
          date: new Date(a.dueDate),
          title: a.name,
          type: "assignment",
        }));

        setEvents(formattedEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const getEventsForDay = (day) => {
    return events.filter(
      (e) =>
        e.date.getDate() === day &&
        e.date.getMonth() === currentDate.getMonth() &&
        e.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const getEventColor = (type) => {
    switch (type) {
      case "assignment":
        return "bg-academic-secondary";
      case "project":
        return "bg-academic-accent";
      default:
        return "bg-academic-primary";
    }
  };

  const today = new Date();

  if (loading)
    return (
      <Card className="p-6 shadow-card text-center">
        <p>Loading calendar...</p>
      </Card>
    );

  if (error)
    return (
      <Card className="p-6 shadow-card text-center">
        <p className="text-academic-danger">{error}</p>
      </Card>
    );

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-academic-secondary" />
          <h3 className="text-lg font-semibold">Academic Calendar</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-medium text-sm">{monthName}</span>
          <Button variant="ghost" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="p-2 text-center text-xs font-medium text-muted-foreground"
          >
            {d}
          </div>
        ))}

        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="p-2" />
        ))}

        {days.map((day) => {
          const dayEvents = getEventsForDay(day);
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div key={day} className="relative">
              <div
                className={`p-2 text-center text-sm rounded-md cursor-pointer transition-all ${
                  isToday
                    ? "bg-black text-white font-semibold"
                    : "hover:bg-muted"
                }`}
              >
                {day}
              </div>

              {dayEvents.length > 0 && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                  <div
                    className={`w-2 h-2 rounded-full ${getEventColor(
                      dayEvents[0].type
                    )}`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium mb-2">Upcoming Assignments</h4>
        <div className="space-y-2">
          {events
            .filter((e) => e.date >= new Date())
            .sort((a, b) => a.date - b.date)
            .slice(0, 3)
            .map((e, i) => (
              <div key={i} className="flex items-center space-x-3 text-sm">
                <div
                  className={`w-3 h-3 rounded-full ${getEventColor(e.type)}`}
                ></div>
                <span className="text-muted-foreground">
                  {e.date.toDateString()}
                </span>
                <span>{e.title}</span>
              </div>
            ))}
        </div>
      </div>
    </Card>
  );
};

export default AcademicCalendar;
