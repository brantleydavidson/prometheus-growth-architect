
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';

// Main pages
import Index from './pages/Index';
import DTCPage from './pages/DTCPage';
import AIQuotient from './pages/AIQuotient';
import ServicesPage from './pages/ServicesPage';
import AIEnablementPage from './pages/AIEnablementPage';
import ConsultingPage from './pages/ConsultingPage';
import B2BPage from './pages/B2BPage';
import BookAuditPage from './pages/BookAuditPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import CRMConsultingConwayARPage from './pages/InsightDetail/CRMConsultingConwayARPage';
import CRMConsultingPage from './pages/InsightDetail/CRMConsultingPage';
import NotFound from './pages/NotFound';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import MediaLibrary from './pages/admin/MediaLibrary';
import PageEditor from './pages/admin/PageEditor';
import BlogEditor from './pages/admin/BlogEditor';
import SEOManager from './pages/admin/SEOManager';

// Auth protection
import AuthProtected from './components/cms/AuthProtected';

const App = () => {
  return (
    <div className="App w-full min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/dtc" element={<DTCPage />} />
        <Route path="/ai-quotient" element={<AIQuotient />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ai-enablement" element={<AIEnablementPage />} />
        <Route path="/services/consulting-gtm" element={<ConsultingPage />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/book-audit" element={<BookAuditPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/insights/crm-consulting-services-in-conway-ar" element={<CRMConsultingConwayARPage />} />
        <Route path="/insights/crm-consulting" element={<CRMConsultingPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<AuthProtected><Dashboard /></AuthProtected>} />
        <Route path="/admin/media-library" element={<AuthProtected><MediaLibrary /></AuthProtected>} />
        <Route path="/admin/page-editor" element={<AuthProtected><PageEditor /></AuthProtected>} />
        <Route path="/admin/blog-editor" element={<AuthProtected><BlogEditor /></AuthProtected>} />
        <Route path="/admin/seo-manager" element={<AuthProtected><SEOManager /></AuthProtected>} />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// For compatibility with existing imports
export { App };

// Default export
export default App;
