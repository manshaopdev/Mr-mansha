import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceDetailSection } from './components/ServiceDetailSection';
import { ServiceModal } from './components/ServiceModal';
import { InteractiveEstimator } from './components/InteractiveEstimator';
import { CaseStudies } from './components/CaseStudies';
import { WorkProcess } from './components/WorkProcess';
import { Packages } from './components/Packages';
import { TeamSection } from './components/TeamSection';
import { Testimonials } from './components/Testimonials';
import { InquirySection } from './components/InquirySection';
import { Footer } from './components/Footer';
import { AgencyMouseAnimation } from './components/AgencyMouseAnimation';

import { Currency, SubService, ServiceDetail, PackageOption } from './types/agency';
import { SERVICES_DATA } from './data/agencyData';

export function App() {
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [activeServiceId, setActiveServiceId] = useState<string>('graphic-design');
  
  // Modal for deep-dive sub-service view
  const [activeSubServiceModal, setActiveSubServiceModal] = useState<{
    sub: SubService;
    parent: ServiceDetail;
  } | null>(null);

  // Pre-selected service when navigating to inquiry form
  const [inquiryInitialService, setInquiryInitialService] = useState<string | undefined>(undefined);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'PKR' ? 'USD' : 'PKR'));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceTab = (serviceId: string) => {
    setActiveServiceId(serviceId);
    scrollToSection('services-breakdown');
  };

  const handleOpenInquiryWithService = (serviceName?: string) => {
    if (serviceName) {
      setInquiryInitialService(serviceName);
    }
    scrollToSection('contact-inquiry');
  };

  const handleSendEstimateToInquiry = (
    selectedItems: string[],
    totalCost: number,
    curr: Currency
  ) => {
    const formattedSummary = `Estimate: ${selectedItems.join(', ')} (${curr === 'PKR' ? '₨' : '$'}${totalCost.toLocaleString()})`;
    setInquiryInitialService(formattedSummary);
    scrollToSection('contact-inquiry');
  };

  const handleSelectPackage = (pkg: PackageOption) => {
    setInquiryInitialService(`Package: ${pkg.name} (${currency === 'PKR' ? '₨' : '$'}${currency === 'PKR' ? pkg.pricePKR.toLocaleString() : pkg.priceUSD.toLocaleString()})`);
    scrollToSection('contact-inquiry');
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200 antialiased font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Primary Sticky Header */}
      <Navbar
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onOpenInquiry={handleOpenInquiryWithService}
        onScrollTo={scrollToSection}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with interactive 3-discipline preview */}
        <Hero
          onExploreServices={() => scrollToSection('services-breakdown')}
          onOpenInquiry={handleOpenInquiryWithService}
          onOpenEstimator={() => scrollToSection('cost-estimator')}
          onSelectServiceTab={handleSelectServiceTab}
        />

        {/* Core Comprehensive Service Breakdowns (Har Detail for Graphic Design, Web Dev, Digital Marketing) */}
        <ServiceDetailSection
          activeServiceId={activeServiceId}
          onChangeActiveService={(id) => setActiveServiceId(id)}
          onOpenSubServiceModal={(sub, parent) =>
            setActiveSubServiceModal({ sub, parent })
          }
          onOpenInquiry={handleOpenInquiryWithService}
        />

        {/* Interactive Cost & Timeline Calculator */}
        <InteractiveEstimator
          currency={currency}
          onToggleCurrency={toggleCurrency}
          onSendEstimateToInquiry={handleSendEstimateToInquiry}
        />

        {/* Verified Case Studies & Client Outcomes */}
        <CaseStudies onOpenInquiry={handleOpenInquiryWithService} />

        {/* Work Process: 4-Step Execution System */}
        <WorkProcess />

        {/* Curated Packages & Retainers (PKR / USD) */}
        <Packages
          currency={currency}
          onToggleCurrency={toggleCurrency}
          onSelectPackage={handleSelectPackage}
        />

        {/* Team Section (Specialists in Design, Code & Marketing) */}
        <TeamSection onOpenInquiry={() => scrollToSection('contact-inquiry')} />

        {/* Verified Client Testimonials */}
        <Testimonials />

        {/* Project Inquiry & Direct WhatsApp / Email Booking */}
        <InquirySection
          currency={currency}
          initialService={inquiryInitialService}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onScrollTo={scrollToSection}
        onSelectService={handleSelectServiceTab}
      />

      {/* Interactive Mouse Animation & Floating WhatsApp Widget */}
      <AgencyMouseAnimation />

      {/* Deep-Dive Sub-Service Inspection Modal */}
      {activeSubServiceModal && (
        <ServiceModal
          subService={activeSubServiceModal.sub}
          parentService={activeSubServiceModal.parent}
          onClose={() => setActiveSubServiceModal(null)}
          onInquire={handleOpenInquiryWithService}
        />
      )}
    </div>
  );
}

export default App;
