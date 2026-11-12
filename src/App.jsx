import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProjectProvider } from './context/ProjectContext';

// Layout components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import JudgeDemoBar from './components/demo/JudgeDemoBar';

// 24 Application Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import FreelancerDashboardPage from './pages/FreelancerDashboardPage';
import ProjectCreatePage from './pages/ProjectCreatePage';
import AIAgreementGeneratorPage from './pages/AIAgreementGeneratorPage';
import AgreementReviewPage from './pages/AgreementReviewPage';
import ProjectWorkspacePage from './pages/ProjectWorkspacePage';
import MilestoneDetailPage from './pages/MilestoneDetailPage';
import DeliverableSubmissionPage from './pages/DeliverableSubmissionPage';
import AIVerificationReportPage from './pages/AIVerificationReportPage';
import RevisionRequestPage from './pages/RevisionRequestPage';
import ClientChangeRequestPage from './pages/ClientChangeRequestPage';
import AIChangeImpactPage from './pages/AIChangeImpactPage';
import ChangeRequestNegotiationPage from './pages/ChangeRequestNegotiationPage';
import AmendmentHistoryPage from './pages/AmendmentHistoryPage';
import AIScheduleRecoveryPage from './pages/AIScheduleRecoveryPage';
import DelayAttributionReportPage from './pages/DelayAttributionReportPage';
import PaymentDeductionPage from './pages/PaymentDeductionPage';
import DisputeCopilotPage from './pages/DisputeCopilotPage';
import PayPalCheckoutPage from './pages/PayPalCheckoutPage';
import TransactionHistoryPage from './pages/TransactionHistoryPage';
import UserProfilePage from './pages/UserProfilePage';

function AppLayout({ children }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar />
        <main>{children}</main>
        <JudgeDemoBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex max-w-7xl w-full mx-auto pb-24">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <JudgeDemoBar />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <AppLayout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/role-selection" element={<RoleSelectionPage />} />
              <Route path="/client-dashboard" element={<ClientDashboardPage />} />
              <Route path="/freelancer-dashboard" element={<FreelancerDashboardPage />} />
              <Route path="/project-create" element={<ProjectCreatePage />} />
              <Route path="/agreement-generator" element={<AIAgreementGeneratorPage />} />
              <Route path="/agreement-review" element={<AgreementReviewPage />} />
              <Route path="/workspace" element={<ProjectWorkspacePage />} />
              <Route path="/milestone/:id" element={<MilestoneDetailPage />} />
              <Route path="/deliverable-submission" element={<DeliverableSubmissionPage />} />
              <Route path="/ai-verification" element={<AIVerificationReportPage />} />
              <Route path="/revision-request" element={<RevisionRequestPage />} />
              <Route path="/change-request" element={<ClientChangeRequestPage />} />
              <Route path="/change-impact" element={<AIChangeImpactPage />} />
              <Route path="/change-negotiation" element={<ChangeRequestNegotiationPage />} />
              <Route path="/amendment-history" element={<AmendmentHistoryPage />} />
              <Route path="/schedule-recovery" element={<AIScheduleRecoveryPage />} />
              <Route path="/delay-attribution" element={<DelayAttributionReportPage />} />
              <Route path="/payment-deduction" element={<PaymentDeductionPage />} />
              <Route path="/dispute-copilot" element={<DisputeCopilotPage />} />
              <Route path="/paypal-checkout" element={<PayPalCheckoutPage />} />
              <Route path="/transactions" element={<TransactionHistoryPage />} />
              <Route path="/profile" element={<UserProfilePage />} />
            </Routes>
          </AppLayout>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}
