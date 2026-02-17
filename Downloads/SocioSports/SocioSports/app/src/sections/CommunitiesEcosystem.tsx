import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Trophy, Calendar, Building2, ArrowRight, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const CommunitiesEcosystem = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const connections = [
    {
      icon: Users,
      title: 'Athletes',
      description: 'Find local players to join your community and events',
      link: '/athletes',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Trophy,
      title: 'Coaches',
      description: 'Connect with certified trainers for your events and programs',
      link: '/coaches',
      color: 'from-[var(--accent-orange)] to-yellow-500',
    },
    {
      icon: Calendar,
      title: 'Tournaments',
      description: 'Seamlessly register your teams for local competitions',
      link: '/events',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Building2,
      title: 'Institutions',
      description: 'Partner with schools and academies for expanded reach',
      link: '/institutions',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.eco-header > *',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.eco-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.eco-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[var(--bg-primary)]"
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Header */}
        <div className="eco-header text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Network className="w-6 h-6 text-[var(--accent-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-orange)]">
              Ecosystem Integration
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight">
            Powered by <span className="text-gradient">SocioSports Ecosystem</span>
          </h2>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your community connects seamlessly with athletes, coaches, tournaments, and institutions across the platform.
          </p>
        </div>

        {/* Central Diagram */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative p-8 rounded-[32px] bg-[var(--bg-secondary)] border border-[var(--border)]">
            {/* Center Hub */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--accent-orange)] to-yellow-500 flex items-center justify-center">
                  <span className="text-2xl font-black text-white text-center leading-tight">
                    YOUR<br/>COMMUNITY
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full bg-[var(--accent-orange)]/20 animate-ping" />
              </div>
            </div>

            {/* Connection Cards */}
            <div className="eco-grid grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {connections.map((conn, idx) => (
                <Link
                  key={idx}
                  to={conn.link}
                  className="eco-card group p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent-orange)]/30 transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${conn.color} p-[2px] mb-4 group-hover:scale-110 transition-transform`}>
                    <div className="w-full h-full rounded-xl bg-[var(--bg-primary)] flex items-center justify-center">
                      <conn.icon className="w-5 h-5 text-[var(--accent-orange)]" />
                    </div>
                  </div>
                  
                  <h3 className="text-base font-black text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-orange)] transition-colors">
                    {conn.title}
                  </h3>
                  
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {conn.description}
                  </p>
                  
                  <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[var(--accent-orange)] opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            to="/ecosystem"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] text-sm font-bold text-[var(--text-primary)] hover:border-[var(--accent-orange)]/50 transition-all"
          >
            <Network className="w-4 h-4 text-[var(--accent-orange)]" />
            Explore Full Ecosystem
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CommunitiesEcosystem;
