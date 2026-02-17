import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MapPin, Briefcase, MoveRight, Search, PlusCircle, Mail, ArrowRight } from 'lucide-react';
import SimpleFooter from '../sections/SimpleFooter';
import SEOHead from '../components/SEOHead';
import { api } from '../services/api';
import JobsSection from '../sections/JobsSection';
import { useAnalytics } from '../components/AnalyticsProvider';
import JobApplicationModal from '../components/JobApplicationModal';

const JobsPage = () => {
    const pageRef = useRef<HTMLDivElement>(null);
    const { trackEvent } = useAnalytics();

    // CMS State
    const [content, setContent] = useState({
        hero: {
            title: 'BUILD THE FUTURE OF SPORTS.',
            description: 'Join the team revolutionizing India\'s sports ecosystem. We are looking for passionate individuals to drive our mission forward.'
        },
        jobs: [] as any[]
    });
    const [realJobs, setRealJobs] = useState<any[]>([]);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const [cmsData, jobsData] = await Promise.all([
                    api.cms.get('jobs-page'),
                    api.getJobs()
                ]);

                if (cmsData && cmsData.content) {
                    setContent(prev => ({ ...prev, ...JSON.parse(cmsData.content) }));
                }
                setRealJobs(jobsData);
            } catch (e) {
                console.error('Failed to load Jobs content', e);
            }
        };
        fetchContent();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.jobs-hero-text',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.1 }
            );

            gsap.fromTo('.job-card',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: '.jobs-list', start: 'top 80%' } }
            );
        }, pageRef);

        return () => ctx.revert();
    }, [content, realJobs]);

    const athleteJobs = realJobs.filter(j => (j.category === 'ATHLETE_OPPORTUNITY' || j.category === 'ATHLETE') && j.isActive);
    const coachJobs = realJobs.filter(j => (j.category === 'COACHING_POSITION' || j.category === 'COACH') && j.isActive);
    const socioSportsJobs = realJobs.filter(j => (j.category === 'JOIN_SOCIO_SPORTS' || j.category === 'SOCIOSPORTS' || !j.category) && j.isActive);

    return (
        <main ref={pageRef} className="bg-[var(--bg-primary)] min-h-screen flex flex-col pt-24">
            <SEOHead
                title="Careers | SocioSports"
                description={content.hero.description}
            />

            <section className="container mx-auto px-6 mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border)] mb-4 jobs-hero-text">
                    <Briefcase className="w-4 h-4 text-[var(--accent-orange)]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)]">We Are Hiring</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-[var(--text-primary)] mb-4 uppercase tracking-tighter jobs-hero-text max-w-4xl mx-auto leading-tight">
                    {content.hero.title}
                </h1>
                <p className="text-base text-[var(--text-secondary)] max-w-2xl mx-auto jobs-hero-text mb-8">
                    {content.hero.description}
                </p>

            </section>

            {athleteJobs.length > 0 && (
                <JobsSection
                    jobs={athleteJobs}
                    title={<>Athlete <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Opportunities</span></>}
                />
            )}

            {coachJobs.length > 0 && (
                <JobsSection
                    jobs={coachJobs}
                    title={<>Coaching <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">Positions</span></>}
                />
            )}

            {socioSportsJobs.length > 0 && (
                <JobsSection
                    jobs={socioSportsJobs}
                    title={<>Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">SocioSports</span></>}
                />
            )}

            {/* Post a Job CTA */}
            <section className="container mx-auto px-6 mb-20">
                <div className="bg-[var(--bg-secondary)] rounded-3xl p-6 md:p-8 border border-[var(--border)] text-center max-w-3xl mx-auto">
                    <div className="w-12 h-12 rounded-full bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-center mx-auto mb-4">
                        <PlusCircle className="w-6 h-6 text-[var(--text-primary)]" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">Hiring Sports Talent?</h3>
                    <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
                        Post to India's most focused network of athletes, coaches, and sports professionals.
                    </p>
                    <a
                        href="mailto:jobs@sociosports.com?subject=Post a Job Inquiry"
                        className="inline-flex items-center gap-2 btn-secondary px-6 py-3"
                        onClick={() => trackEvent('click_post_job', { location: 'jobs_page' })}
                    >
                        <Mail className="w-4 h-4" />
                        Post a Free Job
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>

            <SimpleFooter />
        </main >
    );
};



export default JobsPage;
