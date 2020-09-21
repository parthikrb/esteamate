import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { isEqual, isWeekend } from "date-fns";

const localizer = momentLocalizer(moment);

const ViewCalendar = (props) => {
  const { currentUser } = props;
  const [events, setEvents] = useState([]);

  const handleSelect = (event) => {
    const days = event.slots;
    let _events = Array.from(events);
    let dateIndex;

    if (event.action !== "doubleClick") {
      days.map((day) => {
        dateIndex = _events.findIndex(
          (e) => e.id === currentUser.id && isEqual(day, e.start)
        );

        if (dateIndex > -1 && !isWeekend(day)) {
          _events.splice(dateIndex, 1);
        } else if (!isWeekend(day)) {
          _events.push({
            id: currentUser.id,
            start: new Date(day),
            end: new Date(day),
            title: currentUser.fullname,
          });
        }
      });

      setEvents(_events);
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
