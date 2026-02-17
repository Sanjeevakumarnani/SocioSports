import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Linkedin,
    Globe,
    MapPin,
    Calendar,
    Award,
    MoveRight,
    Target,
    Users,
    Zap,
    Shield,
    Eye,
    Building2,
    Heart,
    Sparkles,
    MoveDown
} from 'lucide-react';
import InspirationStory from '../sections/InspirationStory';
import SimpleFooter from '../sections/SimpleFooter';

gsap.registerPlugin(ScrollTrigger);

const AboutUsPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.fromTo('.about-hero-text',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
            );

            // Section scroll animations
            gsap.utils.toArray('.about-section').forEach((section: any) => {
                gsap.fromTo(section.querySelectorAll('.animate-on-scroll'),
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 85%',
                        }
                    }
                );
            });
        }, pageRef);

        return () => ctx.revert();
    }, []);

    const [missionPoints, setMissionPoints] = useState([
        { title: 'Empowerment', desc: 'Digital identity for athletes.', icon: Award },
        { title: 'Sustainability', desc: 'Sustainable sports careers.', icon: Target },
        { title: 'Participation', desc: 'Sports on Wheels access.', icon: Users },
        { title: 'Revitalization', desc: 'Reviving physical bonding.', icon: Zap },
        { title: 'Connectivity', desc: 'Linking the entire network.', icon: Heart },
    ]);

    const [coreValues, setCoreValues] = useState([
        { title: 'Community First', desc: 'Strengthening real-world bonds.', icon: Users },
        { title: 'Health & Wellness', desc: 'Active engagement focus.', icon: Sparkles },
        { title: 'Inclusivity', desc: 'Spaces where everyone thrives.', icon: Target },
        { title: 'Joy in Movement', desc: 'Accessible fun for all.', icon: Eye },
        { title: 'Trust & Safety', desc: 'Managed professional events.', icon: Shield },
    ]);

    const [companyInfo, setCompanyInfo] = useState([
        { label: 'Company Name', value: 'ViranAI Solutions' },
        { label: 'Brand', value: 'SocioSports' },
        { label: 'Headquarters', value: 'Hyderabad, India' },
        { label: 'Founded', value: '2023' },
    ]);

    const [leadership, setLeadership] = useState<any[]>([]);
    const [advisors, setAdvisors] = useState<any[]>([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                // Import api dynamically or use existing import if available
                const { api } = await import('../services/api');
                const members = await api.getTeam();

                setLeadership(members.filter((m: any) => m.category === 'LEADERSHIP'));
                setAdvisors(members.filter((m: any) => m.category === 'ADVISOR'));
            } catch (error) {
                console.error('Failed to fetch team members:', error);
            }
        };
        fetchTeam();
    }, []);

    const [services, setServices] = useState([
        'Community Sports Programs',
        'Fitness & Wellness Events',
        'Corporate Engagement',
        'School Sports Programs'
    ]);



    return (
        <main ref={pageRef} className="bg-[var(--bg-primary)] overflow-hidden">
            {/* 1. Hero Section - Condensed */}
            <section className="relative min-h-[60vh] flex items-center justify-center pt-20 px-6 overflow-hidden">
                <div className="container mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] mb-6 about-hero-text">
                        <div className="w-2 h-2 rounded-full bg-[var(--accent-orange)]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)]">Our Identity</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] mb-6 tracking-tighter uppercase about-hero-text leading-[1.1]">
                        CONNECTING <span className="text-gradient italic">ATHLETES.</span><br />BUILDING COMMUNITIES.
                    </h1>
                    <p className="text-base md:text-lg text-[var(--text-secondary)] font-medium max-w-xl mx-auto leading-relaxed about-hero-text mb-8">
                        India's First Sports Networking & Community Platform. We're on a mission to make sports accessible to <strong>Everyone, Everywhere.</strong>
                    </p>
                    <div className="flex justify-center animate-bounce opacity-20">
                        <MoveDown className="w-5 h-5 text-[var(--text-primary)]" />
                    </div>
                </div>

                {/* Ambient Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[var(--accent-orange)]/5 blur-[180px] rounded-full" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 blur-[180px] rounded-full" />
                </div>
            </section>

            {/* 2. Our Story Section - Tighter */}
            <section className="py-12 container mx-auto px-6 about-section border-t border-[var(--border)]">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="animate-on-scroll">
                        <span className="text-[var(--accent-orange)] font-black text-[10px] uppercase tracking-widest mb-3 block">The Genesis</span>
                        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-6 tracking-tighter uppercase">WHY WE <span className="text-gradient italic font-black">STARTED.</span></h2>
                        <div className="space-y-4 text-base text-[var(--text-secondary)] font-medium leading-relaxed">
                            <p>SocioSports was started to bring people back into real-world play and meaningful connections — through sports, fitness, and shared experiences.</p>
                            <p>In a virtual age, we revitalize physical communities. Sports is the ultimate bridge between people of all ages.</p>
                        </div>
                    </div>
                    <div className="relative animate-on-scroll">
                        <img
                            src="/images/about_genesis.png"
                            alt="Founding story"
                            className="rounded-3xl shadow-xl border border-[var(--border)] max-h-[350px] w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* 2.5 Founder's Story Section */}
            <section className="py-16 bg-[var(--bg-secondary)] border-y border-[var(--border)] about-section">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-10 animate-on-scroll">
                            <span className="text-[var(--accent-orange)] font-black text-[10px] uppercase tracking-widest mb-3 block">The Story Behind</span>
                            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">FOUNDER&apos;S <span className="text-gradient italic font-black">VISION.</span></h2>
                        </div>
                        
                        <div className="bg-[var(--bg-primary)] rounded-[40px] p-8 md:p-12 border border-[var(--border)] animate-on-scroll">
                            <div className="space-y-6 text-base text-[var(--text-secondary)] font-medium leading-relaxed">
                                <p className="text-lg md:text-xl text-[var(--text-primary)] font-bold">
                                    We saw two growing problems around us.
                                </p>
                                <p>
                                    Thousands of trained sportspeople across India were struggling without income, visibility, or career opportunities, despite years of dedication and sacrifice. At the same time, people were becoming inactive and disconnected — kids stuck to screens, adults confined to work routines, and seniors feeling isolated.
                                </p>
                                <p className="text-[var(--text-primary)] font-semibold">
                                    We realized sports could solve both.
                                </p>
                                <p>
                                    SocioSports with a concept called <span className="text-[var(--accent-orange)] font-bold">Sports-On-Wheels</span> was created to bring sports back into everyday life while creating real opportunities for athletes and trainers. By connecting sportspeople with general citizens, events, and jobs, we turn screen time into play time, inactivity into engagement, and sports passion into sustainable careers.
                                </p>
                                <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border-l-4 border-[var(--accent-orange)] my-8">
                                    <p className="text-lg md:text-xl text-[var(--text-primary)] font-bold italic">
                                        &ldquo;Sports on Wheels: if people can&apos;t come to sports, let&apos;s bring sports to people.&rdquo;
                                    </p>
                                </div>
                                <p>
                                    Sports is not just about medals — it&apos;s about <span className="text-[var(--accent-orange)] font-semibold">health, dignity, and human connection.</span>
                                </p>
                            </div>
                            
                            <div className="mt-10 pt-8 border-t border-[var(--border)] flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-black text-[var(--text-primary)] uppercase tracking-wider">Founder</p>
                                    <p className="text-[var(--accent-orange)] font-bold text-lg">SocioSports</p>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--accent-orange)]/10 rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-sm font-medium text-[var(--accent-orange)]">Building the future of sports</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2.6 Impact Metrics */}
            <section className="py-12 container mx-auto px-6 about-section">
                <div className="text-center mb-10 animate-on-scroll">
                    <span className="text-[var(--accent-orange)] font-black text-[10px] uppercase tracking-widest mb-3 block">Our Impact</span>
                    <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] tracking-tighter uppercase">NUMBERS THAT <span className="text-gradient italic font-black">MATTER.</span></h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { number: '500+', label: 'Athletes Connected', icon: Users },
                        { number: '50+', label: 'Events Hosted', icon: Calendar },
                        { number: '20+', label: 'Communities Built', icon: Heart },
                        { number: '5+', label: 'Cities Active', icon: MapPin },
                    ].map((metric, i) => (
                        <div key={i} className="bg-[var(--bg-secondary)] rounded-3xl p-6 border border-[var(--border)] text-center hover:border-[var(--accent-orange)]/30 transition-all animate-on-scroll">
                            <metric.icon className="w-8 h-8 text-[var(--accent-orange)] mx-auto mb-3" />
                            <p className="text-3xl md:text-4xl font-black text-[var(--text-primary)] tracking-tighter">{metric.number}</p>
                            <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-2">{metric.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Vision & Mission Horizontal Grid - High Density */}
            <section className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border)] about-section">
                <div className="container mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-12 animate-on-scroll">
                        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-4 uppercase tracking-tighter">VISION & <span className="text-gradient font-black">MISSION</span></h2>
                        <p className="text-[var(--text-secondary)] font-medium text-sm italic">
                            "To build India's most inclusive sports ecosystem where every athlete has visibility, dignity, and opportunity."
                        </p>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
                        {missionPoints.map((point, i) => (
                            <div key={i} className="p-6 rounded-3xl bg-[var(--bg-primary)] border border-[var(--border)] hover:border-[var(--accent-orange)]/20 transition-all group animate-on-scroll">
                                <point.icon className="w-6 h-6 text-[var(--accent-orange)] mb-4 transform group-hover:scale-110 transition-transform" />
                                <h4 className="text-base font-black text-[var(--text-primary)] mb-2 uppercase tracking-tighter">{point.title}</h4>
                                <p className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest leading-tight">{point.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. The DNA & Company - Unified High Density */}
            <section className="py-12 container mx-auto px-6 about-section">
                <div className="grid lg:grid-cols-2 gap-10">
                    {/* DNA */}
                    <div className="animate-on-scroll">
                        <span className="text-[var(--accent-orange)] font-black text-[10px] uppercase tracking-widest mb-3 block">Our DNA</span>
                        <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-6 tracking-tighter uppercase leading-tight">WHAT WE <br /><span className="text-gradient font-black">STAND FOR.</span></h2>
                        <div className="grid gap-3">
                            {coreValues.map((value, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border)] flex gap-4 items-center hover:bg-[var(--bg-secondary)]/80 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-orange)]/10 flex items-center justify-center shrink-0">
                                        <value.icon className="w-5 h-5 text-[var(--accent-orange)]" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black text-[var(--text-primary)] uppercase tracking-tighter leading-none">{value.title}</h4>
                                        <p className="text-[10px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Company Snapshot */}
                    <div className="animate-on-scroll bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[40px] p-6 md:p-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-full mb-6">
                            <Building2 className="w-3 h-3 text-[var(--accent-orange)]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Company Information</span>
                        </div>
                        <h2 className="text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-6 leading-tight">BIOGRAPHY.</h2>

                        <div className="space-y-0 mb-6">
                            {companyInfo.map((info, i) => (
                                <div key={i} className="flex justify-between items-center py-3 border-b border-[var(--border)] group transition-colors hover:border-[var(--accent-orange)]/30">
                                    <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">{info.label}</span>
                                    <span className="text-xs font-black text-[var(--text-primary)]">{info.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                            {services.map((service, i) => (
                                <div key={i} className="px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-center gap-2.5 hover:bg-[var(--accent-orange)] transition-colors group">
                                    <div className="w-1 h-1 rounded-full bg-[var(--accent-orange)] group-hover:bg-white" />
                                    <span className="text-[9px] font-black text-[var(--text-primary)] group-hover:text-white uppercase tracking-widest leading-none">{service}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Inspiration Story - Migrated from Home Page */}
            <InspirationStory />

            {/* 6. Leadership Section - Concise Cards */}
            <section className="py-12 container mx-auto px-6 about-section border-t border-[var(--border)]">
                <div className="mb-10 text-center animate-on-scroll">
                    <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] uppercase tracking-tighter mb-3">THE <span className="text-gradient font-black">LEADERSHIP.</span></h2>
                    <p className="text-sm text-[var(--text-secondary)] font-medium max-w-xl mx-auto">Diverse team merging technology and sports science expertise.</p>
                </div>

                <div className="grid gap-4">
                    {leadership.map((member, i) => (
                        <div key={i} className="rounded-[32px] bg-[var(--bg-secondary)] border border-[var(--border)] animate-on-scroll overflow-hidden hover:bg-[var(--bg-secondary)]/80 transition-all">
                            <div className="grid lg:grid-cols-12 gap-6 items-center p-6 md:p-8">
                                <div className="lg:col-span-2">
                                    <div className="aspect-square rounded-2xl overflow-hidden border border-[var(--border)] max-w-[100px] mx-auto lg:mx-0 bg-[var(--bg-primary)] flex items-center justify-center">
                                        {member.image ? (
                                            <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-all duration-700" />
                                        ) : (
                                            <Users className="w-8 h-8 text-[var(--text-secondary)]" />
                                        )}
                                    </div>
                                </div>
                                <div className="lg:col-span-10">
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <div>
                                            <h3 className="text-xl md:text-2xl font-black text-[var(--text-primary)] uppercase tracking-tighter">{member.name}</h3>
                                            <p className="text-[var(--accent-orange)] font-black uppercase tracking-widest text-[9px] mt-1">{member.role}</p>
                                        </div>
                                        <a href={member.linkedin} className="w-8 h-8 rounded-full bg-[var(--bg-primary)] flex items-center justify-center hover:bg-[#0077b5] transition-all group shrink-0">
                                            <Linkedin className="w-3.5 h-3.5 text-[var(--text-secondary)] group-hover:text-white" />
                                        </a>
                                    </div>
                                    <p className="text-sm text-[var(--text-secondary)] font-medium leading-normal mb-2">{member.bio}</p>
                                    {member.quote && (
                                        <p className="text-[var(--text-secondary)] font-medium text-[11px] italic leading-tight border-l-2 border-[var(--accent-orange)] pl-4">"{member.quote}"</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 7. Advisory Board - Condensed */}
            <section className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border)] about-section">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-xl font-black text-[var(--text-primary)] uppercase tracking-widest mb-10">STRATEGIC <span className="text-gradient font-black">ADVISORS.</span></h2>
                    <div className="grid lg:grid-cols-2 gap-4 text-left">
                        {advisors.map((advisor, i) => (
                            <div key={i} className="p-6 rounded-[32px] bg-[var(--bg-primary)] border border-[var(--border)] animate-on-scroll hover:bg-[var(--bg-primary)]/80 transition-all">
                                <div className="flex gap-5 items-center mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-[var(--text-secondary)]" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-black text-[var(--text-primary)] uppercase tracking-tighter leading-tight">{advisor.name}</h4>
                                        <p className="text-[var(--accent-orange)] font-black text-[8px] uppercase tracking-widest mt-0.5 italic">{advisor.role}</p>
                                    </div>
                                </div>
                                <p className="text-xs text-[var(--text-secondary)] font-medium leading-relaxed">{advisor.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA - Minimalist */}
            <section className="py-20 container mx-auto px-6 about-section">
                <div className="relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] rounded-[48px] p-6 md:p-16 text-center">
                    <div className="absolute top-0 left-1/4 w-1/2 h-1/2 bg-[var(--accent-orange)]/5 blur-[100px] rounded-full pointer-events-none" />
                    <h2 className="text-2xl md:text-4xl font-black text-[var(--text-primary)] mb-8 tracking-tighter uppercase leading-[1.1] animate-on-scroll">
                        BUILD THE <span className="text-gradient italic font-black">FUTURE.</span>
                    </h2>
                    <button className="btn-primary px-10 py-4 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-3 mx-auto">
                        Join the Ecosystem
                        <MoveRight className="w-4 h-4" />
                    </button>
                </div>
            </section>

            <SimpleFooter />
        </main>
    );
};

export default AboutUsPage;
