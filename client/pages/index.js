import SignInComponent from "../components/auth/signin";

const LandingPage = (props) => {
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

export default LandingPage;
