import Head from "next/head";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>GTA Tracker</title>
        <link rel="shortcut icon" href="/GTA_Logo.jpg" />
        <meta
          name="description"
          content="Gamesports Talent Academy Scholar Tracker and Management"
        />
      </Head>
      <Header></Header>
      <main className="w-full">{children}</main>
      <Footer></Footer>
    </>
  );
}
