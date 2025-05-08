import React from 'react';
import Navbar from '../components/home/Navbar';
import { Helmet } from 'react-helmet';
import Landing from '../components/home/Landing';
import Footer from '../components/dark/home/footer';
import ProgressScroll from '../components/Common/ProgressScroll';
import LoadingScreen from '../components/Common/loader';
import Lines from '../components/Common/Lines';
import Cursor from '../components/Common/cusor';

function Home() {
  return (
    <div>
      <Helmet>
        <title>Gavi</title>
        <link rel="icon" href="/assets/imgs/favicon.ico" />
        <link rel="shortcut icon" href="/assets/imgs/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/assets/css/plugins.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Helmet>
      <Cursor />

      <Lines />
      {/* <LoadingScreen /> */}
      <ProgressScroll />
      <div>
        <Navbar />
        <main className="container">
          <Landing />
        </main>
        <Footer />
      </div>
      <script
        src="/assets/js/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <script
        src="/assets/js/jquery-migrate-3.4.0.min.js"
        strategy="beforeInteractive"
      />
      <script src="/assets/js/plugins.js" strategy="lazyOnload" />
      <script src="/assets/js/scripts.js" strategy="beforeInteractive" />
      <script src="/assets/js/three.min.js" strategy="lazyOnload" />
    </div>
  );
}

export default Home;
