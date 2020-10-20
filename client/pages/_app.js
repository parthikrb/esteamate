import React from "react";
import PropTypes from "prop-types";
import { loadCurrentUser } from "../store/actions/current-user";
import { makeStyles } from "@material-ui/core/styles";
import { ToastProvider } from "react-toast-notifications";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import buildClient from "../helpers/build-client";
import theme from "../helpers/theme";
import Menu from "../containers/menu/menu";
import { wrapper } from "../store/store";

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css'

const useStyles = makeStyles({
  content: {
    height: "81vh",
  },
});
const MyApp = (props) => {
  const classes = useStyles();
  const { Component, pageProps, currentUser } = props;

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
        <ToastProvider placement="bottom-right" autoDismiss>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {currentUser && Object.keys(currentUser).length > 0 ? (
            <Menu currentUser={currentUser}>
              <div className={classes.content}>
                <Component {...pageProps} currentUser={currentUser} />
              </div>
            </Menu>
          ) : (
            <Component {...pageProps} currentUser={currentUser} />
          )}
        </ToastProvider>
      </ThemeProvider>
    </React.Fragment>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const client = buildClient(ctx);
  await ctx.store.dispatch(loadCurrentUser(client));
  const state = await ctx.store.getState();

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = (await Component.getInitialProps(ctx, client)) || {};
  }

  return {
    pageProps,
    currentUser: state.current_user.user,
  };
};

export default wrapper.withRedux(MyApp);
