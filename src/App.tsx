
// Since App.tsx is a read-only file, we'll create a wrapper for it

import { AuthProvider } from "@/hooks/useAuth";
import AuthProtected from "@/components/cms/AuthProtected";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { initializeCMSData } from "@/utils/cms-storage";

// Import once and export
export { AuthProvider, AuthProtected, initializeCMSData };
