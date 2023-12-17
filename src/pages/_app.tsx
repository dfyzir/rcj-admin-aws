import React from "react";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@aws-amplify/ui-react/styles.css";

import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "@/components/nav/Navbar";

Amplify.configure(config, {
  ssr: true,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <NextUIProvider>
        <ToastContainer />
        <Head>
          {/* Add other global metadata tags here */}
          <title>RCJ Admin</title>
          <meta
            name="description"
            content="Add, update, delete RCJ's chassis here"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </NextUIProvider>
    </Authenticator.Provider>
  );
}
export default withAuthenticator(App);
