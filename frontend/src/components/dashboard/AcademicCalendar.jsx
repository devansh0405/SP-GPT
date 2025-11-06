import React, { useState } from "react";
import { Card } from "../ui/card";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const AcademicCalendar = () => {
  // Keep track of the currently displayed month
  const [currentDate, setCurrentDate] = useState(new Date());

  // Format: "November 2025"
  const monthName = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  // Mock calendar events
  const events = [
    { date: 15, type: "assignment", title: "Data Structures Project Due" },
    { date: 18, type: "exam", title: "Database Management Exam" },
    { date: 22, type: "holiday", title: "University Holiday" },
    { date: 25, type: "project", title: "Web Development Presentation" },
  ];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const getEventForDay = (day) => {
    return events.find((event) => event.date === day);
  };

  const getEventColor = (type) => {
    switch (type) {
      case "assignment":
        return "bg-academic-secondary";
      case "exam":
        return "bg-academic-danger";
      case "holiday":
        return "bg-academic-success";
      case "project":
        return "bg-academic-accent";
      default:
        return "bg-primary";
    }
  };

  // 🔹 Handlers for navigating months
  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // 🔹 For highlighting "today" only if it’s the same month and year
  const today = new Date();
  const isSameMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

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

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-xs font-medium text-muted-foreground"
          >
            {day}
          </div>
        ))}

        {/* Empty Days */}
        {emptyDays.map((_, i) => (
          <div key={`empty-${i}`} className="p-2"></div>
        ))}

        {/* Calendar Days */}
        {days.map((day) => {
          const event = getEventForDay(day);
          const isToday = isSameMonth && day === today.getDate();

          return (
            <div key={day} className="relative">
              <div
                className={`p-2 text-center text-sm cursor-pointer rounded-md transition-colors hover:bg-muted ${
                  isToday ? "bg-academic-primary text-white font-bold" : ""
                }`}
              >
                {day}
              </div>
              {event && (
                <div
                  className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${getEventColor(
                    event.type
                  )}`}
                ></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Events Legend */}
      <div className="mt-4 pt-4 border-t">
        <h4 className="text-sm font-medium mb-2">Upcoming Events</h4>
        <div className="space-y-2">
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center space-x-3 text-sm">
              <div
                className={`w-3 h-3 rounded-full ${getEventColor(event.type)}`}
              ></div>
              <span className="text-muted-foreground">{event.date}</span>
              <span>{event.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AcademicCalendar;
