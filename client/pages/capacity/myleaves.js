import React from "react";
import * as actions from "../../store/actions/leave";
import ViewCalendar from "../../components/calendar/view-calendar";

const MyLeaves = ({ currentUser, leaves }) => {
  return <ViewCalendar currentUser={currentUser} leaves={leaves} />;
};

MyLeaves.getInitialProps = async (context, client) => {
  const state = await context.store.getState();
  const currentUser = state.current_user.user;
  await context.store.dispatch(actions.loadUserSquadLeaves(client, currentUser.id));

  return { currentUser: currentUser, leaves: state.leave.squadLeaves };
};

export default MyLeaves;
