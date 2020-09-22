import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { isEqual, isWeekend } from "date-fns";
import axios from "axios";

const localizer = momentLocalizer(moment);

const ViewCalendar = (props) => {
  const { currentUser, leaves } = props;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const tempEvents = [];
    leaves.map((leave) => {
      tempEvents.push({
        id: leave.id,
        start: new Date(leave.date),
        end: new Date(leave.date),
        title: leave.user,
      });
    });
    setEvents(tempEvents);
  }, [leaves]);

  const handleSelect = (event) => {
    const days = event.slots;
    let _events = Array.from(events);
    let dateIndex;

    if (event.action !== "doubleClick") {
      days.map(async (day) => {
        dateIndex = _events.findIndex(
          (e) => e.title === currentUser.fullname && isEqual(day, e.start)
        );

        if (dateIndex > -1 && !isWeekend(day)) {
          axios.delete("/api/leaves/" + events[dateIndex].id);
          _events.splice(dateIndex, 1);
          setEvents(_events);
        } else if (!isWeekend(day)) {
          const { data } = await axios.post("/api/leaves", {
            user: currentUser.fullname,
            date: day,
          });
          _events.push({
            id: data.id,
            start: new Date(day),
            end: new Date(day),
            title: currentUser.fullname,
          });
          setEvents(_events);
        }
      });
    }
  };

  return (
    <div style={{ height: "85vh" }}>
      <Calendar
        selectable
        popup
        events={events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        views={{ month: true }}
        defaultView={Views.MONTH}
        onSelectSlot={handleSelect}
      />
    </div>
  );
};

export default ViewCalendar;
