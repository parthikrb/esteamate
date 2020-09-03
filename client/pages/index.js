import SignInComponent from "../components/auth/signin";

const LandingPage = (props) => {
  return (
    <div>{props.currentUser ? <div>Dashboard</div> : <SignInComponent />}</div>
  );
};

export default LandingPage;
