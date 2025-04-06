import React from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import ProjectsPage from '../components/ProjectsPage';
import FeaturedHomes from '../components/FeaturedHomes';
import Footer from '../components/Footer';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`min-h-screen ${inter.className}`}>
      <Head>
        <title>Ayat Real Estate - Luxury Properties in Addis Ababa</title>
        <meta name="description" content="Discover luxury real estate properties in Addis Ababa with Ayat Real Estate. Find your dream home today." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#1e40af" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Navbar />
      <Hero />
      <ProjectsPage />
      <FeaturedHomes />
      <Footer />
    </main>
  );
} 