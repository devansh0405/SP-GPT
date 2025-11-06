import React from "react";
import { Card } from "../ui/card";
import { Calendar, Star } from "lucide-react";

const holidays = [
  {
    id: 1,
    title: "Winter Break",
    startDate: "Dec 17, 2025",
    endDate: "Jan 19, 2026",
    type: "Academic Break",
    daysLeft: 40,
  },
  {
    id: 2,
    title: "Republic Day",
    startDate: "Jan 26, 2026",
    endDate: "Jan 26, 2026",
    type: "National Holiday",
    daysLeft: 76,
  },
  {
    id: 3,
    title: "Holi Festival",
    startDate: "Mar 4, 2026",
    endDate: "Mar 4, 2026",
    type: "Festival Holiday",
    daysLeft: 83,
  },
];

const HolidaysCard = () => {
  const nextHoliday = holidays[0];

  return (
    <Card className="p-6 shadow-card w-full">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="h-5 w-5 text-academic-success" />
        <h3 className="text-lg font-semibold">Holidays</h3>
      </div>

      {/* Next Holiday Highlight */}
      <div className="p-4 mb-6 rounded-lg bg-gradient-to-r from-academic-primary to-academic-secondary text-white w-full">
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

      {/* Holidays in a horizontal flex layout */}
      <div className="flex flex-wrap gap-4 justify-between">
        {holidays.map((holiday) => (
          <div
            key={holiday.id}
            className="flex-1 min-w-[250px] p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
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

      <div className="mt-6 pt-3 border-t text-center">
        <p className="text-sm text-muted-foreground">
          View full academic calendar for more dates
        </p>
      </div>
    </Card>
  );
};

export default HolidaysCard;
