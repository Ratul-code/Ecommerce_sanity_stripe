import React from "react";
import "../styles/globals.css";
import { Layout } from "../src/components";
import StateContext from "../src/context/StateContext";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Toaster/>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
