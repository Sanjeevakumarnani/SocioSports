import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building2, Users, School, PartyPopper, CheckCircle, ArrowRight } from 'lucide-react';
import UniversalBookingModal from '../components/UniversalBookingModal';

gsap.registerPlugin(ScrollTrigger);

const EventTypes = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [selectedService, setSelectedService] = useState<any>(null);

    const types = [
        {
            title: "Society Sports Days",
            icon: Users,
            desc: "Comprehensive half-day or full-day sports carnivals for residential communities. Includes equipment, referees, and fun games for all ages.",
            features: ["Family-centric Games", "Badminton & Cricket", "Zero Setup Required"],
            color: "#ec4899"
        },
        {
            title: "Corporate Team Building",
            icon: Building2,
            desc: "High-energy tournaments and fitness challenges designed to boost employee morale and teamwork. Professional management from start to finish.",
            features: ["Inter-Company Leagues", "Stress-Buster Games", "Awards & Ceremony"],
            color: "#3b82f6"
        },
        {
            title: "School Sports Programs",
            icon: School,
            desc: "Structured annual sports days and inter-house competitions. We bring international standard gear and certified officials to your school ground.",
            features: ["Age-Appropriate Drills", "March Past Support", "Medal Distribution"],
            color: "#f59e0b"
        },
        {
            title: "Mega Carnivals",
            icon: PartyPopper,
            desc: "Large-scale public events with multi-sport zones, entertainment stages, and food stalls. Managing crowds of 500+ with ease.",
            features: ["Multi-Sport Zones", "Crowd Management", "Sponsorship Ready"],
            color: "#8b5cf6"
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.evt-card',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-[var(--bg-primary)] border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-6 uppercase tracking-tight">
                        Our <span className="text-gradient">Services</span>
                    </h2>
                    <p className="text-[var(--text-secondary)] font-medium max-w-2xl mx-auto">
                        Beyond listings, we engineer world-class sports experiences. Choose the perfect format for your community.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {types.map((type, idx) => {
                        const Icon = type.icon;
                        return (
                            <div
                                key={idx}
                                className="evt-card group p-6 md:p-8 rounded-[32px] bg-[var(--bg-secondary)] border border-[var(--border)] hover:border-[var(--accent-orange)]/30 transition-all duration-300 hover:bg-[var(--bg-primary)]"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Icon className="w-7 h-7" style={{ color: type.color }} />
                                    </div>
                                    <div className="px-4 py-2 rounded-full border border-[var(--border)] text-xs font-black uppercase tracking-widest text-[var(--text-primary)]/50 group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-primary)]/20 transition-all">
                                        Expert Managed
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black text-[var(--text-primary)] mb-3 uppercase tracking-tight">{type.title}</h3>
                                <p className="text-[var(--text-secondary)] leading-relaxed mb-6 font-medium">
                                    {type.desc}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {type.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle className="w-4 h-4 text-[var(--text-primary)]/20" />
                                            <span className="text-sm text-[var(--text-primary)]/80 font-bold">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setSelectedService(type)}
                                    className="w-full py-4 rounded-xl bg-[var(--bg-primary)] hover:bg-[var(--accent-orange)] hover:text-white border border-[var(--border)] font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group-btn text-[var(--text-primary)]"
                                >
                                    Book This Event
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <UniversalBookingModal
                isOpen={!!selectedService}
                onClose={() => setSelectedService(null)}
                mode="SERVICE"
                initialData={selectedService}
            />
        </section>
    );
};

export default EventTypes;
