import React from "react";
import PropTypes from "prop-types";
import { ToastProvider } from "react-toast-notifications";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import buildClient from "../helpers/build-client";
import theme from "./theme";
import Menu from "../containers/menu/menu";

export default function MyApp(props) {
  const { Component, pageProps, currentUser } = props;
  console.log(currentUser);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Esteamate | A Bapana Product</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <ToastProvider autoDismiss>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {currentUser ? (
            <Menu currentUser={currentUser}>
              <Component {...pageProps} currentUser={currentUser} />
            </Menu>
          ) : (
            <Component {...pageProps} currentUser={currentUser} />
          )}
        </ToastProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentUser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};
