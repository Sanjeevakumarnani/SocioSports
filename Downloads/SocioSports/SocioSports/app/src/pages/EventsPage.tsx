import EventsTournaments from '../sections/EventsTournaments';
import EventTypes from '../sections/EventTypes';
import SimpleFooter from '../sections/SimpleFooter';
import SEOHead from '../components/SEOHead';

const EventsPage = () => {
    return (
        <main>
            <SEOHead
                title="Sports Events & Tournaments in India | SocioSports"
                description="Discover and register for upcoming sports events, tournaments, and leagues across India. Cricket, football, badminton, running events & more. Find your next competition today."
            />
            <div className="pt-20">
                <EventsTournaments />
                <EventTypes />
                <SimpleFooter />
            </div>
        </main>
    );
};

export default EventsPage;
