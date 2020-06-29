import SignIn from "../components/auth/signin";

const LandingPage = () => {
  return (
    <div>
      <SignIn />

      <style jsx global>{`
        body {
          margin: 0;
          --main-color: #33135c;
        }

        @font-face {
          font-family: "menu-font";
          src: url("/fonts/Nunito-Black.ttf");
        }

        @font-face {
          font-family: "sub-font";
          src: url("/fonts/Dosis.ttf");
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
