import SignIn from "../components/auth/signin";

const LandingPage = () => {
  return (
    <div>
      <SignIn />

      <style jsx global>{`
        body {
          margin: 0;
        }

        @font-face {
          font-family: "menu-font";
          src: url("/fonts/Nunito-Black.ttf");
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
