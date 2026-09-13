import { motion } from 'motion/react';
import { Code2, Layout, ShoppingBag, CheckCircle2, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-7 h-7 text-[#00D9FF] group-hover:text-[#00FFFF] transition-colors" />;
      case 'Layout':
        return <Layout className="w-7 h-7 text-[#00D9FF] group-hover:text-[#00FFFF] transition-colors" />;
      case 'ShoppingBag':
        return <ShoppingBag className="w-7 h-7 text-[#00D9FF] group-hover:text-[#00FFFF] transition-colors" />;
      default:
        return <Zap className="w-7 h-7 text-[#00D9FF]" />;
    }
  };

  return (
    <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050510]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#00D9FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#00FFFF]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#00D9FF] uppercase mb-3"
          >
            <span className="w-2 h-2 rounded-full bg-[#00FFFF] shadow-[0_0_8px_#00FFFF]" />
            <span>// 01. CAPABILITIES & SERVICES</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-orbitron font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-wide uppercase"
          >
            Engineered For{' '}
            <span className="text-[#00D9FF] neon-text-blue">Conversion & Scale</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-gray-400 font-poppins leading-relaxed"
          >
            I don’t just write code; I construct hyper-performant digital assets that turn your traffic
            into revenue with cutting-edge cyber aesthetics.
          </motion.p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group relative flex flex-col justify-between rounded-xl p-8 cyber-card border border-[#00D9FF]/20 hover:border-[#00FFFF] shadow-[0_4px_30px_rgba(0,0,0,0.5)] transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(0,217,255,0.35)]"
            >
              {/* Corner tech notch decoration */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden rounded-tr-xl">
                <div className="absolute transform rotate-45 bg-[#00D9FF]/30 w-12 h-2 -top-1 -right-4 group-hover:bg-[#00FFFF] transition-colors" />
              </div>

              <div>
                {/* Header: Icon & Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-lg bg-[#050510] border border-[#00D9FF]/40 flex items-center justify-center shadow-[0_0_15px_rgba(0,217,255,0.25)] group-hover:border-[#00FFFF] group-hover:shadow-[0_0_25px_rgba(0,255,255,0.6)] transition-all">
                    {getIcon(service.iconName)}
                  </div>
                  <span className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 rounded bg-[#00D9FF]/10 text-[#00FFFF] border border-[#00D9FF]/30 font-semibold">
                    {service.badge}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-orbitron font-bold text-2xl text-white group-hover:text-[#00D9FF] transition-colors tracking-wide">
                  {service.title}
                </h3>
                <p className="font-mono text-xs text-[#00FFFF] mt-1 tracking-wide font-medium">
                  {service.tagline}
                </p>

                {/* Description */}
                <p className="mt-4 text-sm text-gray-300 font-poppins leading-relaxed">
                  {service.description}
                </p>

                {/* Feature Bullet points */}
                <div className="mt-6 pt-6 border-t border-[#00D9FF]/15 space-y-2.5">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-poppins">
                      <CheckCircle2 className="w-4 h-4 text-[#00D9FF] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Timeline & Action */}
              <div className="mt-8 pt-4 flex items-center justify-between border-t border-[#00D9FF]/15">
                <div className="font-mono text-[11px] text-gray-400">
                  EST: <span className="text-white font-medium">{service.timeline}</span>
                </div>

                <button
                  id={`service-request-${service.id}`}
                  onClick={() => onSelectService(service.title)}
                  className="flex items-center gap-1.5 text-xs font-orbitron font-semibold text-[#00D9FF] group-hover:text-[#00FFFF] group-hover:translate-x-1 transition-all"
                >
                  <span>INITIALIZE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
