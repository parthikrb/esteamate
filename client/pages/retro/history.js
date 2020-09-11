import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { loadCurrentUserSquads } from "../../store/actions/current-user";
import { loadRetros } from "../../store/actions/retro";

import ViewBoard from "../../components/board/view-board";
import SelectSprint from "../../components/board/select-sprint";

const History = (props) => {
  const { retros, sprints } = props;
  console.log(sprints);

  const [sprintId, setSprintId] = useState(sprints[0].id);
  // const [retrospective, setRetrospective] = useState(retros);

  useEffect(() => {
    const _sprintId = sprintId ? sprintId : sprints[0].id;
    setSprintId(_sprintId);
  }, [retros]);

  const handleSprintChange = (id) => {
    setSprintId(id);
  };

  return (
    <div>
      <SelectSprint sprints={sprints} handleSprintChange={handleSprintChange} />
      <ViewBoard retros={retros} sprint={sprintId} history={true} />
    </div>
  );
};

History.getInitialProps = async (context, client) => {
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

export default connect(mapStateToProps)(History);
