import { Hero } from '@/components/marketing/Hero';
import { CTA } from '@/components/marketing/CTA';
import { FeatureList } from '@/components/social-proof/FeatureList';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { Testimonials } from '@/components/marketing/Testimonials';
import { ImageSpotlight } from '@/components/marketing/ImageSpotlight';
import { StickyCallButton, LeadButton, GradientButton } from '@/components';

const trustIndicators = [
  {
    icon: '🏥',
    title: 'Clinical Leadership',
    description: 'Founded by a healthcare professional with 12+ years experience',
  },
  {
    icon: '✅',
    title: 'Background Checked',
    description: 'Every caregiver is thoroughly vetted and verified',
  },
  {
    icon: '⚡',
    title: 'Fast Placement',
    description: 'Service starts within 24-48 hours',
  },
  {
    icon: '🤝',
    title: 'Personal Matching',
    description: 'Carefully matched caregiver-client relationships',
  },
  {
    icon: '📍',
    title: 'Local & Rural Focus',
    description: 'Serving Fargo and underserved communities',
  },
  {
    icon: '🚗',
    title: 'Transportation + Care',
    description: 'Unique combination of services',
  },
];

const services = [
  {
    icon: '❤️',
    title: 'Personal Care',
    description: 'Bathing, grooming, mobility assistance, and daily living support from compassionate caregivers.',
  },
  {
    icon: '🤝',
    title: 'Companionship',
    description: 'Meaningful social connection, activities, and emotional support to combat isolation.',
  },
  {
    icon: '🚗',
    title: 'Senior Transportation',
    description: 'Safe, reliable rides to medical appointments, errands, and social outings.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Margaret Johnson',
    relationship: 'Adult Daughter',
    content: 'AidaraWell gave us peace of mind. Mom gets excellent care, and I can work without worrying. The caregivers are professional, kind, and treat her like family.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Robert Nielsen',
    relationship: 'Senior, Aging in Place',
    content: 'I wanted to stay home, and AidaraWell made it possible. My caregiver Sarah helps with daily tasks, and we have become real friends. I feel safe and supported.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Sandra Williams',
    relationship: 'Hospital Discharge Planner',
    content: 'AidaraWell is our go-to referral partner. Fast, reliable placement and they genuinely care about outcomes. Best service in the region.',
    rating: 5,
  },
];

export default function Home() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/contact" />

      {/* Hero Section */}
      <Hero
        headline="Stay Safe at Home with Compassionate Care"
        subheadline="Professional personal care, companionship, and transportation for seniors across Fargo and surrounding communities."
        backgroundImage="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80"
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="/contact" className="md:px-8">
              Schedule Free Assessment
            </LeadButton>
            <GradientButton size="lg" href="tel:(701)555-2273" className="md:px-8">
              Call Now: (701) 555-2273
            </GradientButton>
          </div>
        }
      />

      {/* Trust Indicators Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Families Trust AidaraWell
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just a home care agency. We're a trusted partner with clinical expertise, local roots, and genuine care.
            </p>
          </div>

          <FeatureList features={trustIndicators} columns={3} />
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive care solutions tailored to your needs and lifestyle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                icon={<span className="text-4xl">{service.icon}</span>}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>

          <div className="text-center">
            <LeadButton href="/services" size="lg">
              Explore All Services
            </LeadButton>
          </div>
        </div>
      </section>

      <ImageSpotlight
        eyebrow="Care in Action"
        title="Support that feels personal, not institutional"
        description="We match the right caregiver, transportation support, and daily assistance to the person, not just the schedule. That means more dignity, less stress, and a safer routine at home."
        imageSrc="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Caregiver helping an older adult at home"
        bullets={[
          'Hands-on help with bathing, grooming, and mobility',
          'Reliable transportation to appointments and errands',
          'Friendly companionship that reduces isolation',
        ]}
      />

      {/* CTA Section - How It Works Preview */}
      <CTA
        headline="Simple Process, Rapid Results"
        description="From inquiry to care—in just 4 easy steps and as fast as 24-48 hours."
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="/how-it-works">
              See How It Works
            </LeadButton>
          </div>
        }
      />

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Real Stories from Real Families
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from families who've experienced AidaraWell's compassionate care.
            </p>
          </div>

          <Testimonials
            testimonials={testimonials}
            layout="grid"
          />
        </div>
      </section>

      {/* Final CTA Section */}
      <CTA
        headline="Ready to Get Started?"
        description="Request your free in-home assessment today. We'll discuss your needs and create a personalized care plan."
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="/contact">
              Schedule Free Assessment
            </LeadButton>
            <GradientButton size="lg" href="tel:(701)555-2273">
              Call: (701) 555-2273
            </GradientButton>
          </div>
        }
        background="primary"
      />
    </>
  );
}
