import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadCurrentUserSquads } from "../../store/actions/current-user";
import { loadRetros } from "../../store/actions/retro";
import { isAfter, isBefore, isEqual, addDays } from "date-fns";

import ViewBoard from "../../components/board/view-board";
import SelectSprint from "../../components/board/select-sprint";

const Cast = (props) => {
  const { retros, sprints } = props;

  const [sprintId, setSprintId] = useState(undefined);
  // const [retrospective, setRetrospective] = useState(retros);

  const currentSprints = sprints.filter(
    (sprint) =>
      (isAfter(new Date(sprint.end_date), new Date()) ||
        isEqual(new Date(sprint.end_date), new Date()) ||
        isAfter(addDays(new Date(sprint.end_date), 5), new Date())) &&
      (isBefore(new Date(sprint.start_date), new Date()) ||
        isEqual(new Date(sprint.start_date), new Date()))
  );

  useEffect(() => {
    const _sprintId = sprintId ? sprintId : currentSprints[0].id;
    setSprintId(_sprintId);
  }, [retros]);

  const handleSprintChange = (id) => {
    setSprintId(id);
  };

  return (
    <div>
      <SelectSprint
        sprints={currentSprints}
        handleSprintChange={handleSprintChange}
      />
      <ViewBoard retros={retros} sprint={sprintId} />
    </div>
  );
};

Cast.getInitialProps = async (context, client) => {
  await context.store.dispatch(loadCurrentUserSquads(client));
  await context.store.dispatch(loadRetros(client));
  return { retros: [] };
};

const mapStateToProps = (state) => {
  return {
    retros: state.retro.retros,
    sprints: state.current_user.sprints,
    loading: state.retro.loading,
    error: state.retro.error,
  };
};

export default connect(mapStateToProps)(Cast);
