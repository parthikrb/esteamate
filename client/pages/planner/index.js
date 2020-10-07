import React from "react";
import Poll from "../../components/planner/poll";
import Vote from "../../components/planner/vote";
import * as actions from "../../store/actions/current-user";

const Planner = ({ currentUser }) => {
  const { isAdmin } = currentUser;
  return <div>{isAdmin ? <Poll /> : <Vote />}</div>;
};

Planner.getInitialProps = async (context, client) => {
  const state = await context.store.getState();
  await context.store.dispatch(actions.loadCurrentUser(client));
  await context.store.dispatch(actions.loadCurrentUserSquads(client));
  await context.store.dispatch(actions.loadCurrentUserReleases(client));
  await context.store.dispatch(actions.loadCurrentUserSprints(client));

  return { currentUser: state.current_user.user };
};

export default Planner;
