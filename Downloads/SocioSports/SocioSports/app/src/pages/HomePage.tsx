import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../sections/Hero';
import Ecosystem from '../sections/Ecosystem';
import WhyChooseUs from '../sections/WhyChooseUs';
import DesignedForEveryone from '../sections/DesignedForEveryone';
import CorePrinciples from '../sections/CorePrinciples';
import CommunityStories from '../sections/CommunityStories';

import HowItWorks from '../sections/HowItWorks';


import SimpleFooter from '../sections/SimpleFooter';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';

const HomePage = () => {
    // ... useEffect ...

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "SocioSports",
        "url": "https://sociosports.co.in",
        "logo": "https://sociosports.co.in/images/logo.png",
        "sameAs": [
            "https://www.facebook.com/sociosports",
            "https://twitter.com/sociosports",
            "https://www.instagram.com/sociosports"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9876543210",
            "contactType": "customer service"
        }
    };

    return (
        <main className="relative">
            <SEOHead />
            <StructuredData data={organizationSchema} />
            <Hero />
            <WhyChooseUs />
            <DesignedForEveryone />
            <HowItWorks />
            <CorePrinciples />
            <CommunityStories />
            <Ecosystem />
            <SimpleFooter />
        </main>
    );
};

export default HomePage;
