import "react-toastify/dist/ReactToastify.css";
import buildClient from "../helpers/build-client";
import { ToastContainer } from "react-toastify";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  console.log(`_app.js - ${currentUser}`);
  return (
    <div>
      <Component {...pageProps} currentUser={currentUser} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
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

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
