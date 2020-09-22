import React from "react";
import ViewCalendar from "../../components/calendar/view-calendar";

const MyLeaves = ({ currentUser, leaves }) => {
  return <ViewCalendar currentUser={currentUser} leaves={leaves} />;
};

MyLeaves.getInitialProps = async (context, client) => {
  const state = await context.store.getState();
  const { data } = await client.get(
    "/api/leaves/user/" + state.current_user.user.fullname
  );

  return { currentUser: state.current_user.user, leaves: data };
};

export default MyLeaves;
