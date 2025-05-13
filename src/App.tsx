
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import B2BPage from "./pages/B2BPage";
import DTCPage from "./pages/DTCPage";
import ServicesPage from "./pages/ServicesPage";
import AIEnablementPage from "./pages/AIEnablementPage";
import ConsultingPage from "./pages/ConsultingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/b2b" element={<B2BPage />} />
        <Route path="/dtc" element={<DTCPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/ai-enablement" element={<AIEnablementPage />} />
        <Route path="/services/consulting-gtm" element={<ConsultingPage />} />
        {/* Additional routes would be added as they are developed */}
        {/* <Route path="/manufacturing" element={<ManufacturingPage />} />
        <Route path="/professional-services" element={<ProfessionalServicesPage />} />
        <Route path="/restoration" element={<RestorationPage />} />
        <Route path="/services/crm-implementation" element={<CRMImplementationPage />} />
        <Route path="/services/customer-journey" element={<CustomerJourneyPage />} />
        <Route path="/services/paid-media" element={<PaidMediaPage />} />
        <Route path="/services/reporting-analytics" element={<ReportingAnalyticsPage />} />
        <Route path="/insights" element={<InsightsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/book-audit" element={<BookAuditPage />} /> */}
        
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
