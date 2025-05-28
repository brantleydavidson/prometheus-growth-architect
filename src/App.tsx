import React, { lazy, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { initGTM, usePageTracking } from './utils/analytics';

// Main pages - loaded immediately for better UX
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

// Lazy load only heavy, non-critical pages (insight detail pages)
const CRMConsultingConwayARPage = lazy(() => import('./pages/InsightDetail/CRMConsultingConwayARPage'));
const CRMConsultingPage = lazy(() => import('./pages/InsightDetail/CRMConsultingPage'));
const SalesforceJacksonPage = lazy(() => import('./pages/InsightDetail/SalesforceJacksonPage'));
const CRMAuditServicesJacksonPage = lazy(() => import('./pages/InsightDetail/CRMAuditServicesJacksonPage'));
const HubSpotAgencyPartnerConwayARPage = lazy(() => import('./pages/InsightDetail/HubSpotAgencyPartnerConwayARPage'));
const CRMForRealEstateAgentsInLittleRockARPage = lazy(() => import('./pages/InsightDetail/CRMForRealEstateAgentsInLittleRockARPage'));
const HubSpotCRMIntegrationJacksonPage = lazy(() => import('./pages/InsightDetail/HubSpotCRMIntegrationJacksonPage'));
const CRMIntegrationServicesJacksonPage = lazy(() => import('./pages/InsightDetail/CRMIntegrationServicesJacksonPage'));

// Subcategory pages
import ManufacturingPage from './pages/subcategory/ManufacturingPage';
import ProfessionalServicesPage from './pages/subcategory/ProfessionalServicesPage';
import RestorationPage from './pages/subcategory/RestorationPage';
import EcommercePage from './pages/subcategory/EcommercePage';
import SaaSPage from './pages/subcategory/SaaSPage';
import ConsumerServicesPage from './pages/subcategory/ConsumerServicesPage';

// Lazy load admin pages (not critical for initial load)
const LoginPage = lazy(() => import('./pages/admin/LoginPage'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const MediaLibrary = lazy(() => import('./pages/admin/MediaLibrary'));
const PageEditor = lazy(() => import('./pages/admin/PageEditor'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const SEOManager = lazy(() => import('./pages/admin/SEOManager'));
const MigrateStaticContentPage = lazy(() => import('./pages/MigrateStaticContentPage'));
const BlogContentTemplate = lazy(() => import('./pages/admin/BlogContentTemplate'));

// Auth protection
import AuthProtected from './components/cms/AuthProtected';

import ExecutiveCheatSheetPage from './pages/ExecutiveCheatSheet';
import ExecutiveCheatSheetThankYou from './pages/ExecutiveCheatSheetThankYou';

import CRMImplementationPage from './pages/CRMImplementationPage';
import CustomerJourneyPage from './pages/CustomerJourneyPage';
import PaidMediaPage from './pages/PaidMediaPage';
import ReportingAnalyticsPage from './pages/ReportingAnalyticsPage';

// Loading component for lazy loaded pages
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-prometheus-orange"></div>
  </div>
);

const App = () => {
  // Initialize GTM on app load
  React.useEffect(() => {
    initGTM();
  }, []);
  
  // Track page views
  usePageTracking();
  
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
          <Route path="/services/crm-implementation" element={<CRMImplementationPage />} />
          <Route path="/services/customer-journey" element={<CustomerJourneyPage />} />
          <Route path="/services/paid-media" element={<PaidMediaPage />} />
          <Route path="/services/reporting-analytics" element={<ReportingAnalyticsPage />} />
          
          {/* Content Pages */}
          <Route path="/book-audit" element={<BookAuditPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          {/* Legacy static blog post routes - keep for backward compatibility */}
          <Route path="/insights/crm-consulting-services-in-conway-ar" element={<Suspense fallback={<PageLoader />}><CRMConsultingConwayARPage /></Suspense>} />
          <Route path="/insights/crm-consulting" element={<Suspense fallback={<PageLoader />}><CRMConsultingPage /></Suspense>} />
          <Route path="/insights/salesforce-crm-integration-in-jackson-ms" element={<Suspense fallback={<PageLoader />}><SalesforceJacksonPage /></Suspense>} />
          <Route path="/insights/crm-audit-services-in-jackson-ms" element={<Suspense fallback={<PageLoader />}><CRMAuditServicesJacksonPage /></Suspense>} />
          <Route path="/insights/hubspot-agency-partner-in-conway-ar" element={<Suspense fallback={<PageLoader />}><HubSpotAgencyPartnerConwayARPage /></Suspense>} />
          <Route path="/insights/crm-for-real-estate-agents-in-little-rock-ar" element={<Suspense fallback={<PageLoader />}><CRMForRealEstateAgentsInLittleRockARPage /></Suspense>} />
          <Route path="/insights/hubspot-crm-integration-in-jackson-ms" element={<Suspense fallback={<PageLoader />}><HubSpotCRMIntegrationJacksonPage /></Suspense>} />
          <Route path="/insights/crm-integration-services-in-jackson-ms" element={<Suspense fallback={<PageLoader />}><CRMIntegrationServicesJacksonPage /></Suspense>} />
          
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
          <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><LoginPage /></Suspense>} />
          <Route path="/admin" element={<AuthProtected><Suspense fallback={<PageLoader />}><Dashboard /></Suspense></AuthProtected>} />
          <Route path="/admin/media-library" element={<AuthProtected><Suspense fallback={<PageLoader />}><MediaLibrary /></Suspense></AuthProtected>} />
          <Route path="/admin/page-editor" element={<AuthProtected><Suspense fallback={<PageLoader />}><PageEditor /></Suspense></AuthProtected>} />
          <Route path="/admin/blog-editor" element={<AuthProtected><Suspense fallback={<PageLoader />}><BlogEditor /></Suspense></AuthProtected>} />
          <Route path="/admin/seo-manager" element={<AuthProtected><Suspense fallback={<PageLoader />}><SEOManager /></Suspense></AuthProtected>} />
          <Route path="/admin/migrate-content" element={<AuthProtected><Suspense fallback={<PageLoader />}><MigrateStaticContentPage /></Suspense></AuthProtected>} />
          <Route path="/admin/blog-template" element={<AuthProtected><Suspense fallback={<PageLoader />}><BlogContentTemplate /></Suspense></AuthProtected>} />
          
          {/* Executive Cheat Sheet Routes */}
          <Route path="/hubspot-executive-cheatsheet" element={<ExecutiveCheatSheetPage />} />
          <Route path="/hubspot-executive-cheatsheet/thank-you" element={<ExecutiveCheatSheetThankYou />} />
          
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
