import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Globe, Zap, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const CorePrinciples = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const principles = [
        {
            icon: ShieldCheck,
            color: "#FF4D2E", // Orange
            title: "VERIFIED INFRASTRUCTURE",
            description: "Access premium sports facilities verified for 50+ quality parameters. From court surface quality to lighting and amenities, we ensure every venue meets professional standards for your best game."
        },
        {
            icon: Globe,
            color: "#3b82f6", // Blue
            title: "UNIFIED ECOSYSTEM",
            description: "A comprehensive super-app for all your sports needs. Seamlessly book venues, hire expert coaches, register for tournaments, and find local teammates—all with a single SocioSports ID."
        },
        {
            icon: Zap,
            color: "#10b981", // Green
            title: "ZERO FRICTION EXPERIENCE",
            description: "Experience hassle-free sports management. Enjoy real-time slot availability, instant booking confirmation, secure digital payments, and automated refund policies. No calls, no waiting."
        },
        {
            icon: TrendingUp, // or LineChart
            color: "#8b5cf6", // Purple
            title: "PERFORMANCE PATHWAYS",
            description: "Build your digital athlete profile. Track match stats, earn verified skill badges, get discovered by scouts, and progress from amateur to professional levels through data-driven insights."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.principle-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    }
                }
            );

            gsap.fromTo(
                '.section-title',
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 md:py-32 bg-[#09090b] relative overflow-hidden">
            {/* Background Elements if needed, keeping it clean as per screenshot */}
            <div className="container mx-auto px-6 lg:px-8">

                <div className="text-center mb-16 section-title">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter">
                        BUILT ON <span className="text-[var(--accent-orange)]">CORE PRINCIPLES</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {principles.map((item, idx) => (
                        <div
                            key={idx}
                            className="principle-card p-8 rounded-3xl border border-white/10 bg-[#121214] hover:border-[var(--accent-orange)]/30 transition-colors duration-300 group"
                        >
                            <div className="mb-6 inline-flex p-3 rounded-xl bg-opacity-10" style={{ backgroundColor: `${item.color}15` }}>
                                <item.icon className="w-8 h-8" style={{ color: item.color }} />
                            </div>

                            <h3 className="text-xl font-black text-white uppercase mb-4 tracking-tight leading-none group-hover:text-[var(--accent-orange)] transition-colors">
                                {item.title}
                            </h3>

                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CorePrinciples;
