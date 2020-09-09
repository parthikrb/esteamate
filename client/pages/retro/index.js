import React from "react";
import { connect } from "react-redux";
import { loadRetros } from "../../store/actions/retro";

import ViewBoard from "../../components/board/view-board";

const Cast = (props) => {
  const { retros } = props;
  return (
    <div>
      Cast
      <ViewBoard retros={retros} />
    </div>
  );
};

Cast.getInitialProps = async (context, client) => {
  await context.store.dispatch(loadRetros(client));
  return { retros: [] };
};

const mapStateToProps = (state) => {
  return {
    retros: state.retro.retros,
    loading: state.retro.loading,
    error: state.retro.error,
  };
};

export default connect(mapStateToProps)(Cast);
