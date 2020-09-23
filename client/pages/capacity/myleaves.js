import React from "react";
import { loadSquads } from "../../store/actions/squad";
import ViewCalendar from "../../components/calendar/view-calendar";

const MyLeaves = ({ currentUser, leaves }) => {
  return <ViewCalendar currentUser={currentUser} leaves={leaves} />;
};

MyLeaves.getInitialProps = async (context, client) => {
  const state = await context.store.getState();
  const currentUser = state.current_user.user;
  const userSquads = await client.get("/api/squads/user/" + currentUser.id);
  
  let userSquadDetails = [];
  userSquads.data.map((squad) => {
    const squadIndex = userSquadDetails.findIndex(
      (s) => s.username === squad.username
    );
    if (squadIndex < 0) {
      userSquadDetails.push(
        ...squad.product_owner,
        ...squad.scrum_master,
        ...squad.scrum_team
      );
    }
  });

  let squadUsers = [];
  userSquadDetails.map((userSquad) =>
    squadUsers.push(`${userSquad.firstname} ${userSquad.lastname}`)
  );

  const { data } = await client.get("/api/leaves/user/" + squadUsers);

  return { currentUser: currentUser, leaves: data };
};

export default MyLeaves;
