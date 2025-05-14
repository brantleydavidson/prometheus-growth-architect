
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect } from "react";
import { initHubSpot, trackPageView } from "@/utils/hubspotIntegration";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import B2BPage from "./pages/B2BPage";
import DTCPage from "./pages/DTCPage";
import ServicesPage from "./pages/ServicesPage";
import AIEnablementPage from "./pages/AIEnablementPage";
import ConsultingPage from "./pages/ConsultingPage";
import AIQuotientPage from "./pages/AIQuotient";
import InsightsPage from "./pages/InsightsPage";
import BookAuditPage from "./pages/BookAuditPage";
import CRMConsultingPage from "./pages/InsightDetail/CRMConsultingPage";
import CRMConsultingConwayARPage from "./pages/InsightDetail/CRMConsultingConwayARPage";

// Import Admin Pages
import AdminLayout from "./components/cms/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import Dashboard from "./pages/admin/Dashboard";
import PageEditor from "./pages/admin/PageEditor";
import BlogEditor from "./pages/admin/BlogEditor";
import MediaLibrary from "./pages/admin/MediaLibrary";
import SEOManager from "./pages/admin/SEOManager";

const queryClient = new QueryClient();

const App = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Initialize HubSpot and track page views
  useEffect(() => {
    initHubSpot();
    
    // Track page view on initial load and route changes
    trackPageView(window.location.pathname + window.location.search);
  }, [location, navigationType]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/b2b" element={<B2BPage />} />
          <Route path="/dtc" element={<DTCPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/ai-enablement" element={<AIEnablementPage />} />
          <Route path="/services/consulting-gtm" element={<ConsultingPage />} />
          <Route path="/ai-quotient" element={<AIQuotientPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/insights/crm-consulting-services-in-conway-ar" element={<CRMConsultingConwayARPage />} />
          <Route path="/book-audit" element={<BookAuditPage />} />
          
          {/* Admin CMS Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="pages" element={<PageEditor />} />
            <Route path="blogs" element={<BlogEditor />} />
            <Route path="media" element={<MediaLibrary />} />
            <Route path="seo" element={<SEOManager />} />
            <Route path="settings" element={<Dashboard />} /> {/* Placeholder - replace with actual settings page when needed */}
          </Route>
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
