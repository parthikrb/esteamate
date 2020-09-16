import SignInComponent from "../components/auth/signin";
import * as actions from "../store/actions/current-user";

const LandingPage = (props) => {
  console.log(props);
  const { currentUser } = props;
  return (
    <div>
      {currentUser && Object.keys(currentUser).length > 0 ? (
        <div>Dashboard</div>
      ) : (
        <SignInComponent />
      )}
    </div>
  );
};

LandingPage.getInitialProps = async (context, client) => {
  await context.store.dispatch(actions.loadCurrentUser(client));
  // await context.store.dispatch(actions.loadCurrentUserSquads(client));
  // await context.store.dispatch(actions.loadCurrentUserReleases(client));
  // await context.store.dispatch(actions.loadCurrentUserSprints(client));

  const state = context.store.getState();
  // const currentUser = state.current_user.user;

  return {
    currentUser: state.current_user.user,
    // curUserSquads: state.current_user.squads,
    // curUserReleases: state.current_user.releases,
    // curUserSprints: state.current_user.sprints,
  };
};

export default LandingPage;
