import React, { useState } from 'react';
import { Building2, Home, MapPin, Phone, Mail, ChevronRight, Award, Users, Landmark } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Projects from './components/Projects';
import ProjectsPage from './components/ProjectsPage';
import Investment from './components/Investment';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'projects'>('home');

  return (
    <div className="min-h-screen bg-white">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {currentPage === 'home' ? (
        // Home page content
        <>
          <div id="home">
            <Hero setCurrentPage={setCurrentPage} />
          </div>
          <div id="stats">
            <Stats />
          </div>
          <div id="properties">
            <Projects />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
              <button 
                onClick={() => setCurrentPage('projects')}
                className="px-8 py-4 bg-blue-500 text-white text-lg font-light rounded-full 
                         hover:bg-blue-600 transition-all duration-300 flex items-center"
              >
                View All Properties <ChevronRight className="ml-2" />
              </button>
            </div>
          </div>
          <div id="investment">
            <Investment />
          </div>
        </>
      ) : (
        // Projects page content
        <div id="properties">
          <ProjectsPage />
        </div>
      )}

      <div id="about">
        <Footer />
      </div>
    </div>
  );
}

export default App;