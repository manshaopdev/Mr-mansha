import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CyberCursor from './components/CyberCursor';
import InboxModal from './components/InboxModal';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('');
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [inboxCount, setInboxCount] = useState(0);

  const fetchInboxCount = async () => {
    try {
      const res = await fetch('/api/db-status');
      if (res.ok) {
        const data = await res.json();
        setInboxCount(data.totalTransmissions || 0);
      }
    } catch {
      // ignore network blips
    }
  };

  useEffect(() => {
    fetchInboxCount();
  }, []);

  const handleSelectService = (serviceName: string) => {
    setSelectedService(serviceName);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050510] text-white selection:bg-[#00D9FF]/30 selection:text-[#00FFFF] relative overflow-x-hidden">
      {/* 1. Custom Mouse Cursor with Neon Particle Trail */}
      <CyberCursor />

      {/* 2. Futuristic Navbar */}
      <Navbar
        onOpenInbox={() => setIsInboxOpen(true)}
        inboxCount={inboxCount}
      />

      {/* 3. Hero Section */}
      <main>
        <Hero />

        {/* 4. Services Section (Web Dev, UI/UX, E-commerce) */}
        <Services onSelectService={handleSelectService} />

        {/* 5. Portfolio Section (Project Grid with Blue Neon Hover) */}
        <Portfolio />

        {/* 6. About Section (Photo in Circle with Rotating Blue Neon Ring) */}
        <About />

        {/* 7. Contact Section (Neon Inputs, WhatsApp Button, DB Save) */}
        <Contact
          initialService={selectedService}
          onOpenVault={() => setIsInboxOpen(true)}
          onSubmissionSuccess={fetchInboxCount}
        />
      </main>

      {/* 8. Footer Section with Neon Social Icons */}
      <Footer />

      {/* 9. Database Transmission Vault / Inbox Modal */}
      <InboxModal
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
        onDataUpdated={fetchInboxCount}
      />
    </div>
  );
}
