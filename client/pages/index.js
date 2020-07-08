import SignInComponent from "../components/auth/signin";

const LandingPage = (props) => {
  console.log(`index.js - ${JSON.stringify(props.currentUser)}`);
  return <div>{props.currentUser ? <div>Dashboard</div> : <SignInComponent />}</div>;
};

export default LandingPage;
