
import React from 'react';
import './App.css';
import Navbar from './components/navigation/Navbar';
import Footer from './components/layout/Footer';
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import DTCPage from './pages/DTCPage';
import AIQuotient from './pages/AIQuotient';
import ServicesPage from './pages/ServicesPage';
import AIEnablementPage from './pages/AIEnablementPage';
import ConsultingPage from './pages/ConsultingPage';
import B2BPage from './pages/B2BPage';
import BookAuditPage from './pages/BookAuditPage';
import InsightsPage from './pages/InsightsPage';
import CRMConsultingConwayARPage from './pages/InsightDetail/CRMConsultingConwayARPage';
import CRMConsultingPage from './pages/InsightDetail/CRMConsultingPage';
import NotFound from './pages/NotFound';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dtc" element={<DTCPage />} />
        <Route path="/ai-quotient" element={<AIQuotient />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ai-enablement" element={<AIEnablementPage />} />
        <Route path="/services/consulting-gtm" element={<ConsultingPage />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/book-audit" element={<BookAuditPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/insights/crm-consulting-services-in-conway-ar" element={<CRMConsultingConwayARPage />} />
        <Route path="/insights/crm-consulting" element={<CRMConsultingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// For compatibility with existing imports
export { App };

// Default export
export default App;
