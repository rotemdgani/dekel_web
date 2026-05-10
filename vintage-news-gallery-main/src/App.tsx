import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SiteLayout from "@/layout/SiteLayout";
import HomePage from "@/pages/HomePage";
import WorksPage from "@/pages/WorksPage";
import AboutPage from "@/pages/AboutPage";
import ExhibitionsPage from "@/pages/ExhibitionsPage";
import PressPage from "@/pages/PressPage";
import ContactPage from "@/pages/ContactPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/collections/*" element={<Navigate to="/works" replace />} />
          <Route path="/" element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="works" element={<WorksPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="exhibitions" element={<ExhibitionsPage />} />
            <Route path="press" element={<PressPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="privacy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
