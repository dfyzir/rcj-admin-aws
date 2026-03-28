import React from "react";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "@aws-amplify/ui-react/styles.css";

import { ToastContainer } from "react-toastify";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import NavBar from "@/components/nav/Navbar";
import { ThemeProvider } from "../context/themeContext";

Amplify.configure(config, {
  ssr: true,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Authenticator.Provider>
      <ThemeProvider>
        <HeroUIProvider>
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
          <div className="flex h-[100dvh] min-h-0 flex-col overflow-hidden bg-slate-50 text-slate-950 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-50 lg:h-screen lg:flex-row">
            <NavBar />
            <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <ToastContainer />
              <Component {...pageProps} />
            </main>
          </div>
        </HeroUIProvider>
      </ThemeProvider>
    </Authenticator.Provider>
  );
}
export default App;
