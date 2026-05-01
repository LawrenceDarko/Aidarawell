import { Hero } from '@/components/marketing/Hero';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CTA } from '@/components/marketing/CTA';
import { FAQ } from '@/components/marketing/FAQ';
import { ImageSpotlight } from '@/components/marketing/ImageSpotlight';
import { StickyCallButton, LeadButton } from '@/components';

const servicesData = [
  {
    icon: '❤️',
    title: 'Personal Care',
    description: 'Daily living assistance from trained, compassionate caregivers.',
    features: [
      'Bathing and grooming support',
      'Dressing assistance',
      'Toileting and incontinence care',
      'Mobility assistance and fall prevention',
      'Medication reminders and support',
      'Wound care as appropriate',
    ],
  },
  {
    icon: '🤝',
    title: 'Companionship',
    description: 'Combat isolation and loneliness with meaningful social connection.',
    features: [
      'Conversation and social activities',
      'Entertainment and games',
      'Community outings and events',
      'Meal preparation and shared dining',
      'Emotional support and listening',
      'Technology assistance (phone, tablet, etc.)',
    ],
  },
  {
    icon: '🚗',
    title: 'Senior Transportation',
    description: 'Safe, reliable rides to appointments, errands, and social events.',
    features: [
      'Medical appointments and specialists',
      'Grocery shopping and errands',
      'Social outings and community events',
      'Friendly driver companionship',
      'Wheelchair accessible vehicles available',
      'Assistance in and out of vehicle',
    ],
  },
  {
    icon: '🏠',
    title: 'Homemaking',
    description: 'Light housekeeping to maintain a clean, safe living environment.',
    features: [
      'Light cleaning and tidying',
      'Laundry and ironing',
      'Meal planning and preparation',
      'Errands and shopping assistance',
      'General household organization',
      'Pet care support',
    ],
  },
];

const faqs = [
  {
    id: 1,
    question: 'Can I combine multiple services?',
    answer: 'Absolutely! We customize care to your needs. Many clients use Personal Care + Transportation, or Companionship + Homemaking. Our flexibility is a key advantage.',
  },
  {
    id: 2,
    question: 'Are your caregivers trained in specific skills?',
    answer: 'Yes. All our caregivers complete AidaraWell training including infection control, fall prevention, and person-centered care. We also match caregivers to your specific needs.',
  },
  {
    id: 3,
    question: 'How many hours can I book per week?',
    answer: 'We are flexible. Whether you need a few hours per week or full-time daily care, we can accommodate your schedule and preferences.',
  },
  {
    id: 4,
    question: 'What about specialized care (dementia, Parkinson\'s, etc.)?',
    answer: 'We work with a range of conditions. Our founder\'s clinical background ensures appropriate care. Contact us for a confidential discussion about specialized needs.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/contact" />

      {/* Hero Section */}
      <Hero
        headline="Comprehensive Home Care Services"
        subheadline="Personal care, companionship, transportation, and homemaking tailored to your lifestyle and needs."
        backgroundImage="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Care Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the services that fit your needs. Our flexible model lets you mix and match for personalized care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.title}
                icon={<span className="text-5xl">{service.icon}</span>}
                title={service.title}
                description={service.description}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      <ImageSpotlight
        eyebrow="Services That Fit"
        title="Care options built around daily life"
        description="Families rarely need just one service. We combine personal care, companionship, homemaking, and transportation to create a practical plan that supports the whole week, not just one visit."
        imageSrc="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Older adult receiving help with daily living at home"
        reverse
        bullets={[
          'Personal care for bathing, dressing, and mobility',
          'Transportation for appointments, errands, and outings',
          'Light homemaking to keep the home safe and comfortable',
        ]}
      />

      {/* Why Choose AidaraWell for Services */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AidaraWell Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Clinical Oversight
              </h3>
              <p className="text-gray-600">
                Our founder&apos;s 12+ years healthcare experience ensures clinical quality and appropriate care delivery.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalized Matching
              </h3>
              <p className="text-gray-600">
                We don&apos;t just assign caregivers. We carefully match personality, skills, and preferences for genuine connections.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Fast Start
              </h3>
              <p className="text-gray-600">
                Our existing caregiver network means service begins within 24-48 hours in most cases.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Flexible Combinations
              </h3>
              <p className="text-gray-600">
                Mix and match services. Personal care + transportation, or any combination that works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Service Questions
            </h2>
          </div>

          <FAQ items={faqs} />
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Ready to Learn More?"
        description="Schedule your free in-home assessment. We'll discuss which services are right for you and create a personalized plan."
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
