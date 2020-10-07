import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { isEqual, isWeekend } from "date-fns";
import * as actions from "../../store/actions/leave";

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

    if (event.action === "click") {
      days.map(async (day) => {
        dateIndex = _events.findIndex(
          (e) => e.title === currentUser.fullname && isEqual(day, e.start)
        );

        if (dateIndex > -1 && !isWeekend(day)) {
          props.onDelete(events[dateIndex].id);
          _events.splice(dateIndex, 1);
          setEvents(_events);
        } else if (!isWeekend(day)) {
          props.onAdd({
            user: currentUser.fullname,
            date: day,
            username: currentUser.username,
            role: currentUser.role,
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

const mapStateToProps = (state) => {
  return {
    leaves: state.leave.squadLeaves,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (data) => dispatch(actions.addLeave(data)),
    onDelete: (id) => dispatch(actions.deleteLeave(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewCalendar);
