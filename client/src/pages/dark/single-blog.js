import React from 'react';
import { Helmet } from 'react-helmet';
import ProgressScroll from '../../components/Common/ProgressScroll';
import Cursor from '../../components/Common/cusor';
import LoadingScreen from '../../components/Common/loader';
import ContactUs from '../../components/dark/contact/ContactUs';
import Nav from '../../components/dark/blogs/nav';
import Project from '../../components/dark/blogs/single-blog/project';
import Blogs from '../../components/dark/blogs/single-blog/blogs';
import Footer from '../../components/dark/home/footer';
import Lines from '../../components/Common/Lines';

function SingleBlog() {
  return (
    <div>
      <Helmet>
        <title>Gavi - Dark</title>
        <link rel="icon" href="/assets/imgs/favicon.ico" />
        <link rel="shortcut icon" href="/assets/imgs/favicon.ico" />
        <link rel="stylesheet" type="text/css" href="/assets/css/plugins.css" />
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Helmet>
      <Cursor />
      <ContactUs />
      <Lines />
      <LoadingScreen />
      <ProgressScroll />
      <Nav />
      <main className="container">
        <Project />
        <Blogs />
      </main>
      <Footer />
      <script
        src="/assets/js/jquery-3.6.0.min.js"
        strategy="beforeInteractive"
      />
      <script
        src="/assets/js/jquery-migrate-3.4.0.min.js"
        strategy="beforeInteractive"
      />
      <script src="/assets/js/plugins.js" strategy="beforeInteractive" />
      <script src="/assets/js/scripts.js" strategy="beforeInteractive" />
      <script src="/assets/js/three.min.js" strategy="lazyOnload" />
    </div>
  );
}

export default SingleBlog;
