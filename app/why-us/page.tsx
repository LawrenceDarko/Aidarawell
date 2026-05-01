import { Hero } from '@/components/marketing/Hero';
import { FounderStory } from '@/components/marketing/FounderStory';
import { FeatureDifferentiator } from '@/components/marketing/FeatureDifferentiator';
import { Testimonials } from '@/components/marketing/Testimonials';
import { CTA } from '@/components/marketing/CTA';
import { StickyCallButton, LeadButton } from '@/components';

const differentiators = [
  {
    icon: '🏥',
    title: 'Clinical Leadership',
    description: 'Our founder brings 12+ years of healthcare experience. Clinical oversight means better caregiver training and care quality.',
  },
  {
    icon: '🚗',
    title: 'Transportation + Care',
    description: 'Most agencies only offer personal care. We uniquely combine transportation, appointments, and social outings.',
  },
  {
    icon: '⚡',
    title: 'Existing Caregiver Network',
    description: 'We don\'t scramble to find staff. Our established network means faster placement and consistency.',
  },
  {
    icon: '🌾',
    title: 'Rural Community Focus',
    description: 'While others ignore rural areas, we serve Fargo and underserved North Dakota communities with dedication.',
  },
];

const testimonials = [
  {
    id: 1,
    name: 'Margaret Johnson',
    relationship: 'Adult Daughter',
    content: 'AidaraWell gave us peace of mind. Mom gets excellent care, and I can work without worrying. The caregivers are professional, kind, and truly treat her like family.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Robert Nielsen',
    relationship: 'Senior, Aging in Place',
    content: 'I wanted to stay in my home, and AidaraWell made that possible. My caregiver Sarah helps with daily tasks and we\'ve become real friends. I feel safe and supported.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Sandra Williams',
    relationship: 'Hospital Discharge Planner',
    content: 'AidaraWell is our go-to referral partner. Fast placement, reliable caregivers, and they genuinely care about patient outcomes. Best service in the region.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Patricia Chen',
    relationship: 'Adult Son',
    content: 'After dad\'s surgery, we needed help fast. AidaraWell responded immediately and had a caregiver with us within days. Couldn\'t have asked for better service.',
    rating: 5,
  },
];

export default function WhyUsPage() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/contact" />

      {/* Hero Section */}
      <Hero
        headline="Why Families Choose AidaraWell"
        subheadline="Clinical expertise, genuine care, and a commitment to rural communities set us apart."
        backgroundImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Founder Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <FounderStory
            name="Clinical Founder"
            title="Registered Nurse & Healthcare Administrator"
            yearsExperience={12}
            story="With 12+ years of clinical healthcare experience, our founder understands care delivery at the highest level. Having worked in hospitals, clinics, and home health settings, she recognized a gap: agencies that combine clinical expertise with genuine compassion are rare. AidaraWell was founded to fill that gap. Every caregiver is trained to our clinical standards, and every client receives the same level of attention a family member would provide. This isn't just a business—it's a mission to ensure rural communities get world-class care."
            quote="Care shouldn't be one-size-fits-all. Every person deserves a caregiver who understands their needs and genuinely cares about their wellbeing."
            imageUrl="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1400&q=80"
          />
        </div>
      </section>

      {/* Differentiators Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Four core differentiators that make AidaraWell uniquely positioned to serve your family.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((diff) => (
              <FeatureDifferentiator
                key={diff.title}
                icon={diff.icon}
                title={diff.title}
                description={diff.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Commitment to Rural Communities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commitment to Rural Communities
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Many national home care chains have abandoned rural areas—they're not profitable enough. That's not us. We're based in Horace, North Dakota, and we serve the communities we call home: Fargo, West Fargo, Cass County, and rural ND.
            </p>

            <p className="text-gray-700 mb-6">
              We understand rural healthcare challenges: limited transportation, caregiver shortages, geographic distance. These aren't obstacles to us—they're exactly why we exist. We've built a network of local caregivers who know this community and care about it.
            </p>

            <p className="text-gray-700">
              Rural care deserves the same quality, responsiveness, and human touch as urban care. That's our promise.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real families share their AidaraWell experience.
            </p>
          </div>

          <Testimonials
            testimonials={testimonials}
            layout="grid"
          />
        </div>
      </section>

      {/* By the Numbers Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Track Record
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                12+
              </div>
              <p className="text-gray-600 font-medium">Years of Healthcare Experience</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                100%
              </div>
              <p className="text-gray-600 font-medium">Background-Checked Caregivers</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                24-48
              </div>
              <p className="text-gray-600 font-medium">Hours to Care Start</p>
            </div>

            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                5-Star
              </div>
              <p className="text-gray-600 font-medium">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Experience the AidaraWell Difference"
        description="Schedule your free assessment and discover why families trust us with their most precious resource—their loved ones."
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="/contact">
              Schedule Free Assessment
            </LeadButton>
          </div>
        }
        background="primary"
      />
    </>
  );
}
