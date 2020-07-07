import SignInComponent from "../components/auth/signin";
import AppMenu from "../components/menu/menu";

const LandingPage = (props) => {
  console.log(`index.js - ${JSON.stringify(props.currentUser)}`);
  return <div>{props.currentUser ? <AppMenu /> : <SignInComponent />}</div>;
};

export default LandingPage;
