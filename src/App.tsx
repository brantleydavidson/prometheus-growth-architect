
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';

// Main pages
import Index from './pages/Index';
import DTCPage from './pages/DTCPage';
import DTCLandingPage from './pages/DTCLandingPage';
import AIQuotient from './pages/AIQuotient';
import ServicesPage from './pages/ServicesPage';
import AIEnablementPage from './pages/AIEnablementPage';
import ConsultingPage from './pages/ConsultingPage';
import B2BPage from './pages/B2BPage';
import B2BLandingPage from './pages/B2BLandingPage';
import BookAuditPage from './pages/BookAuditPage';
import InsightsPage from './pages/InsightsPage';
import AboutPage from './pages/AboutPage';
import NotFound from './pages/NotFound';
import PlaybooksPage from './pages/PlaybooksPage';

// Import for dynamic blog post component
import DynamicBlogPost from './components/blog/DynamicBlogPost';

// Static insight detail pages (keeping these for backward compatibility)
import CRMConsultingConwayARPage from './pages/InsightDetail/CRMConsultingConwayARPage';
import CRMConsultingPage from './pages/InsightDetail/CRMConsultingPage';
import SalesforceJacksonPage from './pages/InsightDetail/SalesforceJacksonPage';
import CRMAuditServicesJacksonPage from './pages/InsightDetail/CRMAuditServicesJacksonPage';
import HubSpotAgencyPartnerConwayARPage from './pages/InsightDetail/HubSpotAgencyPartnerConwayARPage';
import CRMForRealEstateAgentsInLittleRockARPage from './pages/InsightDetail/CRMForRealEstateAgentsInLittleRockARPage';
import HubSpotCRMIntegrationJacksonPage from './pages/InsightDetail/HubSpotCRMIntegrationJacksonPage';
import CRMIntegrationServicesJacksonPage from './pages/InsightDetail/CRMIntegrationServicesJacksonPage';

// Subcategory pages
import ManufacturingPage from './pages/subcategory/ManufacturingPage';
import ProfessionalServicesPage from './pages/subcategory/ProfessionalServicesPage';
import RestorationPage from './pages/subcategory/RestorationPage';
import EcommercePage from './pages/subcategory/EcommercePage';
import SaaSPage from './pages/subcategory/SaaSPage';
import ConsumerServicesPage from './pages/subcategory/ConsumerServicesPage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import Dashboard from './pages/admin/Dashboard';
import MediaLibrary from './pages/admin/MediaLibrary';
import PageEditor from './pages/admin/PageEditor';
import BlogEditor from './pages/admin/BlogEditor';
import SEOManager from './pages/admin/SEOManager';
import MigrateStaticContentPage from './pages/MigrateStaticContentPage';

// Auth protection
import AuthProtected from './components/cms/AuthProtected';

const App = () => {
  return (
    <ErrorBoundary>
      <div className="App w-full min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* B2B Routes */}
          <Route path="/b2b" element={<B2BLandingPage />} />
          
          {/* DTC Routes */}
          <Route path="/dtc" element={<DTCLandingPage />} />
          
          {/* Playbooks and Assessment Routes */}
          <Route path="/playbooks" element={<PlaybooksPage />} />
          <Route path="/ai-quotient" element={<AIQuotient />} />
          
          {/* Service Pages */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/ai-enablement" element={<AIEnablementPage />} />
          <Route path="/services/consulting-gtm" element={<ConsultingPage />} />
          
          {/* Content Pages */}
          <Route path="/book-audit" element={<BookAuditPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Legacy static blog post routes - keep for backward compatibility */}
          <Route path="/insights/crm-consulting-services-in-conway-ar" element={<CRMConsultingConwayARPage />} />
          <Route path="/insights/crm-consulting" element={<CRMConsultingPage />} />
          <Route path="/insights/salesforce-crm-integration-in-jackson-ms" element={<SalesforceJacksonPage />} />
          <Route path="/insights/crm-audit-services-in-jackson-ms" element={<CRMAuditServicesJacksonPage />} />
          <Route path="/insights/hubspot-agency-partner-in-conway-ar" element={<HubSpotAgencyPartnerConwayARPage />} />
          <Route path="/insights/crm-for-real-estate-agents-in-little-rock-ar" element={<CRMForRealEstateAgentsInLittleRockARPage />} />
          <Route path="/insights/hubspot-crm-integration-in-jackson-ms" element={<HubSpotCRMIntegrationJacksonPage />} />
          <Route path="/insights/crm-integration-services-in-jackson-ms" element={<CRMIntegrationServicesJacksonPage />} />
          
          {/* Dynamic blog post route - this will handle all future blog posts */}
          <Route path="/insights/:slug" element={<DynamicBlogPost />} />
          
          {/* Subcategory Routes */}
          <Route path="/manufacturing" element={<ManufacturingPage />} />
          <Route path="/professional-services" element={<ProfessionalServicesPage />} />
          <Route path="/restoration" element={<RestorationPage />} />
          <Route path="/ecommerce" element={<EcommercePage />} />
          <Route path="/saas" element={<SaaSPage />} />
          <Route path="/consumer-services" element={<ConsumerServicesPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AuthProtected><Dashboard /></AuthProtected>} />
          <Route path="/admin/media-library" element={<AuthProtected><MediaLibrary /></AuthProtected>} />
          <Route path="/admin/page-editor" element={<AuthProtected><PageEditor /></AuthProtected>} />
          <Route path="/admin/blog-editor" element={<AuthProtected><BlogEditor /></AuthProtected>} />
          <Route path="/admin/seo-manager" element={<AuthProtected><SEOManager /></AuthProtected>} />
          <Route path="/admin/migrate-content" element={<AuthProtected><MigrateStaticContentPage /></AuthProtected>} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

// For compatibility with existing imports
export { App };

// Default export
export default App;
