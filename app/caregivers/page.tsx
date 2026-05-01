import { Hero } from '@/components/marketing/Hero';
import { FeatureList } from '@/components/social-proof/FeatureList';
import { CTA } from '@/components/marketing/CTA';
import { ImageSpotlight } from '@/components/marketing/ImageSpotlight';
import { StickyCallButton, LeadButton } from '@/components';

const whyJoinUs = [
  {
    icon: '💚',
    title: 'Meaningful Work',
    description: 'Make a real difference in seniors\' lives. Every day matters.',
  },
  {
    icon: '👥',
    title: 'Supportive Team',
    description: 'Work with a team that genuinely cares about their caregivers.',
  },
  {
    icon: '📚',
    title: 'Continuous Training',
    description: 'We invest in your professional development and clinical skills.',
  },
  {
    icon: '🤝',
    title: 'Flexible Scheduling',
    description: 'Work hours that fit your life. Part-time or full-time options.',
  },
  {
    icon: '💰',
    title: 'Competitive Pay',
    description: 'Fair compensation that reflects your skills and experience.',
  },
  {
    icon: '🎖️',
    title: 'Recognition & Growth',
    description: 'Advance your career with us. Your contributions matter.',
  },
];

const jobBenefits = [
  'Competitive hourly pay',
  'Paid time off',
  'Health insurance options',
  'Professional development stipend',
  'Mileage reimbursement',
  'Equipment & supplies provided',
  'Mentorship from clinical leader',
  'Flexible scheduling',
];

export default function CaregiversPage() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/careers" />

      {/* Hero Section */}
      <Hero
        headline="Join Our Caregiver Team"
        subheadline="Help seniors live independently at home. Meaningful work, competitive pay, and a supportive team culture."
        backgroundImage="https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1600&q=80"
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="mailto:careers@aidarawell.com?subject=Caregiver%20Opportunity">
              Apply Now
            </LeadButton>
          </div>
        }
      />

      {/* Why Join Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Caregivers Choose AidaraWell
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Work with purpose. Our caregivers aren't just employees—they're part of a mission to provide world-class care.
            </p>
          </div>

          <FeatureList features={whyJoinUs} columns={3} />
        </div>
      </section>

      <ImageSpotlight
        eyebrow="The Team Experience"
        title="A workplace built around respect and support"
        description="Caregivers do their best work when they feel valued, prepared, and connected to a mission. We focus on training, communication, and flexible scheduling so the job is sustainable and meaningful."
        imageSrc="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Healthcare team smiling and collaborating"
        bullets={[
          'Flexible hours that fit real life',
          'Training and mentorship from clinical leadership',
          'Work that makes an immediate difference for families',
        ]}
      />

      {/* What We Look For */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We're Looking For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-8 border border-primary-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Required Qualifications
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-gray-700">18 years or older</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-gray-700">Valid driver's license with reliable vehicle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-gray-700">Ability to pass background check</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-gray-700">High school diploma or equivalent</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary-600 font-bold">✓</span>
                  <span className="text-gray-700">Compassion and commitment to quality care</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-8 border border-primary-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Preferred Experience
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-accent-600 font-bold">→</span>
                  <span className="text-gray-700">Home health or hospice experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-600 font-bold">→</span>
                  <span className="text-gray-700">CNA or nursing background</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-600 font-bold">→</span>
                  <span className="text-gray-700">Experience with elderly care</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-600 font-bold">→</span>
                  <span className="text-gray-700">First aid/CPR certification</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent-600 font-bold">→</span>
                  <span className="text-gray-700">Experience with dementia or specialized care</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Job Benefits */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Benefits & Compensation
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {jobBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-primary-50 p-4 rounded-lg">
                <span className="text-primary-600 text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Culture Section */}
      <section className="py-16 md:py-24 bg-accent-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Culture
            </h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              AidaraWell is built on values of compassion, clinical excellence, and genuine human connection. Our founder, with 12+ years of healthcare experience, believes caregiving isn't a transaction—it's a relationship.
            </p>

            <p className="text-gray-700 mb-6">
              We support our caregivers because we know that caregivers who feel supported deliver better care. We invest in your training, celebrate your successes, and stand beside you when challenges arise.
            </p>

            <p className="text-gray-700">
              When you join AidaraWell, you're not just getting a job. You're joining a mission to ensure that seniors in rural North Dakota have access to world-class, compassionate care.
            </p>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Openings
            </h2>
            <p className="text-lg text-gray-600">
              We're always looking for compassionate caregivers to join our team.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                In-Home Caregiver
              </h3>
              <p className="text-gray-600 mb-4">
                Provide personal care, companionship, and support to seniors aging in place. Flexible hours, part-time and full-time available.
              </p>
              <p className="text-sm text-primary-600 font-semibold mb-4">
                Multiple positions available across Fargo, Horace, and surrounding areas
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Senior Transportation Driver
              </h3>
              <p className="text-gray-600 mb-4">
                Provide safe, friendly transportation to medical appointments, errands, and social outings. Must have reliable vehicle and clean driving record.
              </p>
              <p className="text-sm text-primary-600 font-semibold mb-4">
                Part-time and full-time positions available
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Companion Care Specialist
              </h3>
              <p className="text-gray-600 mb-4">
                Combat senior isolation through meaningful social connection. Activities, outings, conversation, and support for active, independent seniors.
              </p>
              <p className="text-sm text-primary-600 font-semibold mb-4">
                Flexible hours, perfect for retirees or part-time workers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Application CTA */}
      <CTA
        headline="Ready to Make a Difference?"
        description="Join our team of dedicated caregivers. Apply now and let's talk about how you can help seniors live safely at home."
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="mailto:careers@aidarawell.com?subject=Caregiver%20Application">
              Apply Now
            </LeadButton>
            <LeadButton size="lg" href="tel:(701)555-2273" variant="secondary">
              Call with Questions
            </LeadButton>
          </div>
        }
      />
    </>
  );
}
