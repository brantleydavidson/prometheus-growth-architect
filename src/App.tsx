
import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <main>
        {/* Main content will be rendered here */}
      </main>
      <Footer />
    </div>
  );
};

// For compatibility with existing imports
export { App };

// Default export
export default App;
