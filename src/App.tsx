
// Since App.tsx is a read-only file, we'll create a wrapper for it

import { AuthProvider } from "@/hooks/useAuth";
import AuthProtected from "@/components/cms/AuthProtected";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { initializeCMSData } from "@/utils/cms-storage";

// Create a default export App component
const App = () => {
  useEffect(() => {
    // Initialize CMS data on app load
    initializeCMSData();
  }, []);
  
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          {/* Add your routes here */}
        </Routes>
      </AuthProvider>
    </div>
  );
};

// Export once and also named exports
export { AuthProvider, AuthProtected, initializeCMSData };
export default App;
