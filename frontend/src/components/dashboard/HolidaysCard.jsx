import React from "react";
import { Card } from "../ui/card";
import { Calendar, Star } from "lucide-react";

const holidays = [
  {
    id: 1,
    title: "Winter Break",
    startDate: "Dec 22, 2024",
    endDate: "Jan 8, 2025",
    type: "Academic Break",
    daysLeft: 12,
  },
  {
    id: 2,
    title: "Republic Day",
    startDate: "Jan 26, 2025",
    endDate: "Jan 26, 2025",
    type: "National Holiday",
    daysLeft: 36,
  },
  {
    id: 3,
    title: "Holi Festival",
    startDate: "Mar 14, 2025",
    endDate: "Mar 14, 2025",
    type: "Festival Holiday",
    daysLeft: 83,
  },
];

const HolidaysCard = () => {
  const nextHoliday = holidays[0];

  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-academic-success" />
        <h3 className="text-lg font-semibold">Holidays</h3>
      </div>

      {/* Next Holiday Highlight */}
      <div className="p-4 mb-4 rounded-lg bg-gradient-secondary text-white">
        <div className="flex items-center space-x-2 mb-1">
          <Star className="h-4 w-4" />
          <span className="text-sm font-medium">Next Holiday</span>
        </div>
        <h4 className="font-semibold">{nextHoliday.title}</h4>
        <p className="text-sm text-white/90 mt-1">
          {nextHoliday.startDate === nextHoliday.endDate
            ? nextHoliday.startDate
            : `${nextHoliday.startDate} - ${nextHoliday.endDate}`}
        </p>
        <div className="mt-2 text-xs bg-white/20 rounded-full px-2 py-1 inline-block">
          {nextHoliday.daysLeft} days to go
        </div>
      </div>

      {/* All Holidays List */}
      <div className="space-y-3">
        {holidays.map((holiday) => (
          <div
            key={holiday.id}
            className="p-3 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium text-sm">{holiday.title}</h4>
                <p className="text-xs text-muted-foreground">{holiday.type}</p>
              </div>
              <span className="px-2 py-1 bg-academic-success/10 text-academic-success text-xs rounded-full font-medium">
                {holiday.daysLeft}d
              </span>
            </div>

            <div className="text-xs text-muted-foreground">
              {holiday.startDate === holiday.endDate
                ? holiday.startDate
                : `${holiday.startDate} - ${holiday.endDate}`}
            </div>
          </div>
        ))}
      </div>

      {/* Academic Calendar Link */}
      <div className="mt-4 pt-3 border-t">
        <p className="text-sm text-muted-foreground text-center">
          View full academic calendar for more dates
        </p>
      </div>
    </Card>
  );
};

export default HolidaysCard;