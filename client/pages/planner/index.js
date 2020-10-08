import React, { useEffect } from "react";
import { socket } from "../../helpers/build-socket";
import Poll from "../../components/planner/poll";
import Vote from "../../components/planner/vote";
import * as actions from "../../store/actions/current-user";

const Planner = ({ currentUser, squads, releases, sprints }) => {
  const { isAdmin } = currentUser;

  useEffect(() => {
    squads.map((squad) => {
      socket.emit("newUser", {
        username: currentUser.fullname,
        squad: squad.id,
      });
    });
  }, []);

  return (
    <div>
      {isAdmin ? (
        <Poll
          currentUser={currentUser}
          squads={squads}
          releases={releases}
          sprints={sprints}
        />
      ) : (
        <Vote />
      )}
    </div>
  );
};

Planner.getInitialProps = async (context, client) => {
  await context.store.dispatch(actions.loadCurrentUser(client));
  await context.store.dispatch(actions.loadCurrentUserSquads(client));
  await context.store.dispatch(actions.loadCurrentUserReleases(client));
  await context.store.dispatch(actions.loadCurrentUserSprints(client));
  const state = await context.store.getState();
  return {
    currentUser: state.current_user.user,
    squads: state.current_user.squads,
    releases: state.current_user.releases,
    sprints: state.current_user.sprints,
  };
};

export default Planner;
