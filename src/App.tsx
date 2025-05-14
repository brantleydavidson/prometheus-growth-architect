import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <div className="App">
          {/* Your app content */}
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
};

// For compatibility with existing imports
export { App };

// Default export
export default App;
