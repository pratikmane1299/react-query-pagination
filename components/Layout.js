import React from 'react';
import Head from 'next/head';

import Navbar from '../components/Navbar';
import Footer from './Footer';

function Layout(props) {
  return (
    <div className="w-full h-screen">
      <Head>
        <title>React Query Pagination</title>
        <meta name="description" content="React Query Pagination with star wars API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mx-auto p-4">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
