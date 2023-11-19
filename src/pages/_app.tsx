import React from "react";
import { Amplify } from "aws-amplify";
import awsconfig from "../aws-exports";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@aws-amplify/ui-react/styles.css";

import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";

Amplify.configure({
  ...awsconfig,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <NextUIProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </NextUIProvider>
    </Authenticator.Provider>
  );
}
export default withAuthenticator(App);
