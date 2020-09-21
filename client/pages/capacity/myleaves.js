import React from "react";
import ViewCalendar from "../../components/calendar/view-calendar";

const MyLeaves = ({ currentUser }) => {
  return <ViewCalendar currentUser={currentUser} />;
};

MyLeaves.getInitialProps = async (context, client) => {
  const state = await context.store.getState();
  return { currentUser: state.current_user.user };
};

export default MyLeaves;
