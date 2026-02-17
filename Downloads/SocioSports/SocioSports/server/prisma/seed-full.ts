
import { PrismaClient } from '@prisma/client';
import process from 'process';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting Full Data Seed...');

    // ==========================================
    // 1. PAGE CONTENT (CMS JSON)
    // ==========================================

    // --- Home Hero ---
    await prisma.pageContent.upsert({
        where: { slug: 'home-hero' },
        update: {},
        create: {
            slug: 'home-hero',
            title: 'Home Page Hero Section',
            content: JSON.stringify({
                taglines: [
                    { line1: 'PLAY.', line2: 'TRAIN.', line3: 'BELONG.' },
                    { line1: 'COMPETE.', line2: 'EXCEL.', line3: 'WIN.' },
                    { line1: 'LEARN.', line2: 'GROW.', line3: 'ACHIEVE.' },
                    { line1: 'CONNECT.', line2: 'INSPIRE.', line3: 'THRIVE.' },
                    { line1: 'DISCOVER.', line2: 'CHALLENGE.', line3: 'SUCCEED.' },
                    { line1: 'PRACTICE.', line2: 'PERFECT.', line3: 'PERFORM.' },
                ],
                heroImages: [
                    { src: 'hero_action.jpg', alt: 'Hero action', sport: 'Sports' },
                    { src: 'hero_athlete.jpg', alt: 'Athlete performance', sport: 'Athletics' },
                    { src: 'hero_track.jpg', alt: 'Track racing', sport: 'Racing' },
                ],
                stats: [
                    { value: '95%', label: 'Athletes have ZERO digital presence', detail: 'Talent remains invisible to scouts' },
                    { value: '143', label: 'Tournaments monthly in Mumbai', detail: 'Most athletes miss 90% of opportunities' },
                    { value: '80%', label: 'Quit sports by age 15', detail: 'Not from lost passion, but lost direction' },
                    { value: '50K+', label: 'Unfilled tournament slots', detail: 'Information gap bridging needed' },
                ]
            })
        }
    });

    // --- Home Ecosystem ---
    await prisma.pageContent.upsert({
        where: { slug: 'home-ecosystem' },
        update: {},
        create: {
            slug: 'home-ecosystem',
            title: 'Home Page Ecosystem Section',
            content: JSON.stringify({
                cards: [
                    {
                        title: "Sports Networking",
                        subtitle: "Connect. Discover. Grow.",
                        description: "Build trusted connections with athletes, coaches, and professionals. Share your journey and grow your visibility.",
                        iconName: "Network",
                        color: "var(--accent-orange)",
                        link: "/community",
                        cta: "Explore Networking",
                        features: ["Connect with Pros", "Discover Opportunities", "Share Profile"]
                    },
                    {
                        title: "Trainers Ecosystem",
                        subtitle: "Visibility. Credibility. Income.",
                        description: "Professionalize your coaching career. Get discovered by students and institutions, manage bookings, and track progress.",
                        iconName: "Activity",
                        color: "#3b82f6",
                        link: "/coaches",
                        cta: "Become a Trainer",
                        features: ["Certified Profile", "Student Mapping", "Income Tracking"]
                    },
                    {
                        title: "Athletes Ecosystem",
                        subtitle: "Recognition. Opportunities. Career.",
                        description: "A permanent digital home for your achievements. verified stats, video highlights, and direct access to recruiters.",
                        iconName: "Trophy",
                        color: "#10b981",
                        link: "/athletes",
                        cta: "Create Profile",
                        features: ["Digital Resume", "Video Uploads", "Scout Visibility"]
                    }
                ]
            })
        }
    });

    // --- Home Inspiration ---
    await prisma.pageContent.upsert({
        where: { slug: 'home-inspiration' },
        update: {},
        create: {
            slug: 'home-inspiration',
            title: 'Home Page Inspiration Section',
            content: JSON.stringify({
                heading: "SOME JOURNEYS BEGIN QUIETLY",
                subHeading: "But they change everything.",
                slides: [
                    {
                        title: "The Beginning",
                        text: "There was a penguin who didn't wait to be ready. No applause. No guarantees. Just a belief that standing still wouldn't take him anywhere."
                    },
                    {
                        title: "The Climb",
                        text: "Every step felt heavy. Every climb felt uncertain. But with each move forward, confidence followed. That's what building a career in sports really looks like."
                    },
                    {
                        title: "The Purpose",
                        text: "Slow days. Hard lessons. Small wins that mean everything. SocioSports is for those moments. When you're unsure, but still moving. When you're learning, growing, and choosing progress over comfort."
                    }
                ]
            })
        }
    });

    // --- Sports On Wheels ---
    await prisma.pageContent.upsert({
        where: { slug: 'sports-on-wheels' },
        update: {},
        create: {
            slug: 'sports-on-wheels',
            title: 'Sports On Wheels Page',
            content: JSON.stringify({
                features: [
                    { iconName: 'Clock', title: '60-Minute Setup', desc: 'Rapid deployment infrastructure that turns any vacant space into a professional arena in under an hour.' },
                    { iconName: 'Trophy', title: 'Elite Equipment', desc: 'International-grade gear for 12+ sports, from professional boundary ropes to electronic scoring systems.' },
                    { iconName: 'Users', title: 'Certified Officials', desc: 'NIS-certified coaches and international-standard referees to manage your tournaments and clinics.' },
                    { iconName: 'Shield', title: 'Safety Guaranteed', desc: 'Compliance with international sports safety standards for both equipment and on-ground management.' }
                ],
                sectors: [
                    {
                        id: 'residential',
                        title: 'Housing Societies',
                        image: '/images/sow_01.jpg',
                        iconName: 'Home',
                        points: [
                            'Weekend sports carnivals',
                            'Professional coaching at your doorstep',
                            'Community bonding events',
                            'Safe, supervised play for kids'
                        ]
                    },
                    {
                        id: 'educational',
                        title: 'Schools & Colleges',
                        image: '/images/sow_03.jpg',
                        iconName: 'School',
                        points: [
                            'Annual sports day infrastructure',
                            'Specialized workshop series',
                            'Inter-school championship hosting',
                            'Professional match-officiating services'
                        ]
                    },
                    {
                        id: 'corporate',
                        title: 'Corporate Parks',
                        image: '/images/sow_04.jpg',
                        iconName: 'Briefcase',
                        points: [
                            'Employee wellness tournaments',
                            'Team building through sport',
                            'Themed sports festivals',
                            'Full tournament logistics management'
                        ]
                    }
                ],
                eventFlow: [
                    { step: '01', title: 'Request an Event', desc: 'Tell us your location, audience, and goals.' },
                    { step: '02', title: 'Planning & Customization', desc: 'We design a tailored experience matching your needs.' },
                    { step: '03', title: 'Event Day', desc: 'Our team arrives with Sports-on-Wheels.' },
                    { step: '04', title: 'Execution', desc: 'Professional management ensures smooth operations.' }
                ],
                safetyItems: [
                    'Trained coordinators and first-aid support',
                    'Equipment safety checks and maintenance',
                    'Age-appropriate activity planning',
                    'Emergency protocols in place',
                    'Insurance coverage for all participants'
                ]
            })
        }
    });

    // --- About Us ---
    await prisma.pageContent.upsert({
        where: { slug: 'about-us' },
        update: {},
        create: {
            slug: 'about-us',
            title: 'About Us Page',
            content: JSON.stringify({
                missionPoints: [
                    { title: 'Empowerment', desc: 'Digital identity for athletes.', iconName: 'Award' },
                    { title: 'Sustainability', desc: 'Sustainable sports careers.', iconName: 'Target' },
                    { title: 'Participation', desc: 'Sports on Wheels access.', iconName: 'Users' },
                    { title: 'Revitalization', desc: 'Reviving physical bonding.', iconName: 'Zap' },
                    { title: 'Connectivity', desc: 'Linking the entire network.', iconName: 'Heart' },
                ],
                coreValues: [
                    { title: 'Community First', desc: 'Strengthening real-world bonds.', iconName: 'Users' },
                    { title: 'Health & Wellness', desc: 'Active engagement focus.', iconName: 'Sparkles' },
                    { title: 'Inclusivity', desc: 'Spaces where everyone thrives.', iconName: 'Target' },
                    { title: 'Joy in Movement', desc: 'Accessible fun for all.', iconName: 'Eye' },
                    { title: 'Trust & Safety', desc: 'Managed professional events.', iconName: 'Shield' },
                ],
                companyInfo: [
                    { label: 'Company Name', value: 'ViranAI Solutions' },
                    { label: 'Brand', value: 'SocioSports' },
                    { label: 'Headquarters', value: 'Hyderabad, India' },
                    { label: 'Founded', value: '2023' },
                ]
            })
        }
    });

    // --- Jobs Page ---
    await prisma.pageContent.upsert({
        where: { slug: 'jobs-page' },
        update: {},
        create: {
            slug: 'jobs-page',
            title: 'Jobs Page Content',
            content: JSON.stringify({
                hero: {
                    title: 'BUILD THE FUTURE OF SPORTS.',
                    description: 'Join the team revolutionizing India\'s sports ecosystem. We are looking for passionate individuals to drive our mission forward.'
                },
                jobs: [
                    {
                        id: 1,
                        role: 'Event Coordinator',
                        org: 'SocioSports Operations',
                        location: 'Hyderabad, On-site',
                        type: 'Full-time',
                        salary: '₹4.5L - ₹6L',
                        desc: 'Manage end-to-end execution of our SportsOnWheels tournaments. Coordinate with vendors, athletes, and ground staff.',
                        requirements: ['3+ years event management experience', 'Strong operational leadership skills', 'Willingness to travel on weekends']
                    }
                ]
            })
        }
    });

    // --- Vendors Page ---
    await prisma.pageContent.upsert({
        where: { slug: 'vendors-page' },
        update: {},
        create: {
            slug: 'vendors-page',
            title: 'Vendors Page Content',
            content: JSON.stringify({
                hero: {
                    subtitle: 'Partner Gateway',
                    title: 'SCALE YOUR BUSINESS.',
                    description: 'Join India\'s premier sports ecosystem. Access massive footfall, build institutional credibility, and connect directly with verified athletes.'
                },
                benefits: [
                    {
                        title: 'Direct Monetization',
                        desc: 'Turn spectators into customers. Sell gear, supplements, and services directly to an active audience.',
                        stats: '3-4x ROI'
                    },
                    {
                        title: 'Brand Visibility',
                        desc: 'Position your brand in the heart of high-performance tournament environments across India.',
                        stats: '5k+ Monthly Reach'
                    },
                    {
                        title: 'Verified Audience',
                        desc: 'Connect with a curated network of professional athletes, certified coaches, and sports enthusiasts.',
                        stats: '100% Verified Users'
                    }
                ],
                stallTypes: [
                    {
                        name: 'Retail Pop-up',
                        image: '/images/vendor_retail_indian.png',
                        desc: 'Maximum exposure for sports gear and apparel. Positioned in high-visibility dugout exits.',
                        features: ['10x10 FT Tent', '2 Display Tables', 'Branding Fascia']
                    },
                    {
                        name: 'Nutrition Station',
                        image: '/images/vendor_nutrition_indian.png',
                        desc: 'Located at hydration points. Perfect for energy drinks, snacks, and recovery supplements.',
                        features: ['8x8 FT Booth', 'Power Supply (15A)', 'Storage Zone']
                    }
                ],
                steps: [
                    { step: '01', title: 'Register', desc: 'Secure your spot through our digital portal.' },
                    { step: '02', title: 'Approve', desc: 'Our team verifies your business profile.' },
                    { step: '03', title: 'Setup', desc: 'Professional setup conducted before start.' },
                    { step: '04', title: 'Profit', desc: 'Connect and monetize at the event.' },
                ]
            })
        }
    });

    // --- Mobile App Page ---
    await prisma.pageContent.upsert({
        where: { slug: 'mobile-app' },
        update: {},
        create: {
            slug: 'mobile-app',
            title: 'Mobile App Page Content',
            content: JSON.stringify({
                hero: {
                    title: 'YOUR SPORTS IN YOUR POCKET.',
                    subtitle: 'Available Now',
                    description: 'The full power of the SocioSports ecosystem. Verified stats, instant bookings, and community connection.',
                    androidLink: '#',
                    iosLink: '#'
                },
                modal: {
                    title: "Shhh... You're Early.",
                    subtitle: 'Stealth Mode',
                    description: 'The ultimate sports ecosystem is currently in Stealth Mode. We are crafting an experience that will redefine how you play. Access is rolling out soon.'
                },
                features: [
                    { title: "Verified Sports ID", desc: "Your digital passport for tournaments and trials." },
                    { title: "Smart Alerts", desc: "Instant notifications for tournament registrations and results." },
                    { title: "Live Scores", desc: "Real-time updates from ongoing matches in your network." },
                    { title: "Easy Booking", desc: "Book turfs, coaches, and events in 3 taps." }
                ],
                steps: [
                    { step: 'Step 1', title: 'Create Profile' },
                    { step: 'Step 2', title: 'Discover & Connect' },
                    { step: 'Step 3', title: 'Book & Play' },
                    { step: 'Step 4', title: 'Grow & Earn' }
                ]
            })
        }
    });

    // ==========================================
    // 2. EVENTS (SQL Table)
    // ==========================================
    const events = [
        {
            title: 'Hyderabad District Badminton Championship',
            location: 'Gachibowli Stadium, Hyderabad',
            date: new Date('2026-02-12'),
            type: 'Ranking Tournament',
            image: '/images/event_badminton.jpg',
            description: 'The official district selection tournament. Categories: U13, U15, U17, U19, and Seniors.',
            price: 1500
        },
        {
            title: 'Corporate Cricket League - Season 5',
            location: 'Gymkhana Grounds, Mumbai',
            date: new Date('2026-02-21'),
            type: 'Corporate',
            image: '/images/event_cricket.jpg',
            description: 'Mumbai\'s premier corporate cricket showdown. 16 Teams. Pink ball format under lights.',
            price: 25000
        },
        {
            title: 'Summer Swimming Gala (U-16)',
            location: 'Olympic Pool, Jubilee Hills',
            date: new Date('2026-03-05'),
            type: 'Juniors',
            image: '/images/event_swimming.jpg',
            description: 'A dedicated gala for rising stars. 50m and 100m freestyle, breaststroke, and relays.',
            price: 500
        }
    ];

    for (const event of events) {
        const existing = await prisma.event.findFirst({ where: { title: event.title } });
        if (!existing) {
            await prisma.event.create({ data: event });
        }
    }

    // ==========================================
    // 3. TEAM MEMBERS (SQL Table)
    // ==========================================
    const team = [
        {
            name: 'Phanindra KKV',
            role: 'Founder & Chief Executive Officer',
            image: '/images/team_phanindra.png',
            bio: 'IIM Business Management graduate with 15 years of experience. Founder of MaxPark with Revenue of ₹1.6 Cr. Executed Government Projects including ISRO/BDL Project Experience.',
            category: 'LEADERSHIP',
            linkedin: '#'
        },
        {
            name: 'MD Javeed (Scientist)',
            role: 'Technology & Innovation Director',
            image: '/images/team_javeed.jpg',
            bio: 'Scientist & Guinness World Record Achiever. 12 International Research Awards & 70 International Research Articles. 12 Patents. Pillars of India Award.',
            category: 'LEADERSHIP',
            linkedin: '#'
        },
        {
            name: 'M Srinivas (Trainer)',
            role: 'Head of Sports Events & Training',
            image: '',
            bio: 'Sports Authority Telangana. 15+ Years Experience. Trained 40,000 Athletes. Medal-Winning Trainees. Large Event Specialist from 100 to 10,000 users.',
            category: 'LEADERSHIP',
            linkedin: '#'
        },
        {
            name: 'Shri Dr. N.S. Dileep, Ph.D.',
            role: 'Academic & University Sports Advisor',
            image: '',
            bio: 'Professor & Physical Director – Jawaharlal Nehru Technological University (JNTU). A highly respected academician, sports administrator, and physical education leader with decades of experience in developing university-level sports ecosystems. Known for his discipline, integrity, and commitment to excellence.',
            category: 'ADVISOR',
            linkedin: '#'
        },
        {
            name: 'T Vijaya Kumar',
            role: 'Mentor & Strategic Advisor – Business Growth',
            image: '',
            bio: 'Retired IAS Officer with extensive experience in governance, urban development, and education administration. Served as Commissioner in Education Department, Telangana Government. Held key positions including Vice Chancellor of Mahatma Gandhi University.',
            category: 'ADVISOR',
            linkedin: '#'
        }
    ];

    for (const member of team) {
        const existing = await prisma.teamMember.findFirst({ where: { name: member.name } });
        if (!existing) {
            await prisma.teamMember.create({ data: member });
        }
    }

    // ==========================================
    // 4. BLOG POSTS (SQL Table)
    // ==========================================
    // We need an author first. Let's find or create a default admin user.
    let adminUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!adminUser) {
        // Fallback if no admin exists (though there should be one)
        // Password: Admin@2026 (hashed with bcrypt 10 rounds)
        const hashedPassword = '$2a$10$oY9XQJj8W5Vp/MvF/h1P0u7C17R5o7v6H8mE2G3V4i5J6K7L8M9N.';
        adminUser = await prisma.user.create({
            data: {
                email: 'admin@sociosports.com',
                password: hashedPassword,
                name: 'System Admin',
                role: 'ADMIN'
            }
        });
    }

    const posts = [
        {
            title: 'The Future of Grassroots Sports in India',
            content: 'India is witnessing a revolution in sports at the grassroots level. With better infrastructure and digital connectivity...',
            category: 'Industry',
            status: 'PUBLISHED',
            image: '/images/blog_grassroots.jpg',
            authorId: adminUser.id
        },
        {
            title: 'Top 5 Nutrition Tips for Young Athletes',
            content: 'Nutrition plays a pivotal role in athletic development. Here are the top 5 tips recommended by our experts...',
            category: 'Health',
            status: 'PUBLISHED',
            image: '/images/blog_nutrition.jpg',
            authorId: adminUser.id
        },
        {
            title: 'Why Mental Toughness Matters',
            content: 'In high-pressure situations, it is often mental toughness that separates the winners from the rest...',
            category: 'Psychology',
            status: 'DRAFT',
            image: '/images/blog_mental.jpg',
            authorId: adminUser.id
        }
    ];

    for (const post of posts) {
        const existing = await prisma.post.findFirst({ where: { title: post.title } });
        if (!existing) {
            await prisma.post.create({ data: post });
        }
    }

    console.log('Full Data Seed Completed Successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
