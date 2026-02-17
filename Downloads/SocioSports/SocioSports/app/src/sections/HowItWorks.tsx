import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HowItWorks = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      number: '01',
      title: 'Create',
      description: 'Sign up and create your sports profile in minutes',
      image: '/images/screens/step1_create.jpg',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: '02',
      title: 'Discover',
      description: 'Find sports activities and events near you',
      image: '/images/screens/step2_discover.jpg',
      color: 'from-purple-500 to-pink-500',
    },
    {
      number: '03',
      title: 'Book',
      description: 'Book slots and join events instantly',
      image: '/images/screens/step3_book.jpg',
      color: 'from-[var(--accent-orange)] to-yellow-500',
    },
    {
      number: '04',
      title: 'Grow',
      description: 'Track progress and achieve your sports goals',
      image: '/images/screens/step4_grow.jpg',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate phone mockups
      gsap.fromTo(
        '.phone-mockup',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      // Animate step info
      gsap.fromTo(
        '.step-info',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Animate connection line
      gsap.fromTo(
        '.connection-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 50%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="py-20 bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="px-4 sm:px-6 lg:px-8 xl:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-0.5 bg-[var(--accent-orange)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--accent-orange)]">
              Simple Process
            </span>
            <div className="w-8 h-0.5 bg-[var(--accent-orange)]" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-primary)] mb-4 tracking-tight">
            How It <span className="text-gradient">Works</span>
          </h2>
          
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Get started with your sports journey in just 4 simple steps
          </p>
        </div>

        {/* Steps with Phone Mockups */}
        <div className="relative max-w-7xl mx-auto">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-32 left-[12.5%] right-[12.5%] h-1 z-0">
            <div className="connection-line h-full bg-gradient-to-r from-blue-500 via-purple-500 via-[var(--accent-orange)] to-green-500 rounded-full origin-left" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center"
              >
                {/* Phone Mockup */}
                <div className="phone-mockup mb-6 group">
                  <div className="relative w-48 h-80 sm:w-52 sm:h-96 mx-auto">
                    {/* Phone Frame */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[2.5rem] p-[3px] shadow-2xl shadow-black/30 group-hover:shadow-[var(--accent-orange)]/20 transition-shadow duration-500">
                      {/* Phone Body */}
                      <div className="w-full h-full bg-gray-900 rounded-[2.3rem] overflow-hidden relative">
                        {/* Dynamic Island / Notch */}
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gray-800 ring-1 ring-gray-700" />
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                        </div>
                        
                        {/* Screen Image */}
                        <div className="absolute inset-2 top-10 rounded-[1.8rem] overflow-hidden bg-[var(--bg-secondary)]">
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>

                        {/* Home Indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full" />
                      </div>
                    </div>

                    {/* Glow Effect on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-b ${step.color} rounded-[2.5rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />
                  </div>
                </div>

                {/* Step Info */}
                <div className="step-info">
                  {/* Step Number */}
                  <div className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent mb-2`}>
                    {step.number}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black text-[var(--text-primary)] mb-2">
                    {step.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-[var(--text-secondary)] max-w-[200px] mx-auto leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Arrow (not on last item) */}
                {idx < steps.length - 1 && (
                  <div className="sm:hidden flex justify-center mt-4">
                    <svg className="w-6 h-6 text-[var(--accent-orange)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-[24px] bg-[var(--bg-secondary)] border border-[var(--border)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-orange)] to-yellow-500 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <div className="text-lg font-black text-[var(--text-primary)]">
                  Ready to Get Started?
                </div>
                <div className="text-sm text-[var(--text-secondary)]">
                  Join 500+ communities already thriving
                </div>
              </div>
            </div>
            <button className="btn-primary px-8 py-3 whitespace-nowrap">
              Start Now — It's Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
