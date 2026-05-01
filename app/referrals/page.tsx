import { Hero } from '@/components/marketing/Hero';
import { ReferralPartnerCard } from '@/components/marketing/ReferralPartnerCard';
import { CTA } from '@/components/marketing/CTA';
import { ImageSpotlight } from '@/components/marketing/ImageSpotlight';
import { StickyCallButton, LeadButton } from '@/components';

const partnerTypes = [
  {
    icon: '🏥',
    title: 'Hospital Discharge Planners',
    description: 'Seamless post-acute care transitions and safe patient placements.',
    benefits: [
      'Rapid 24-48 hour placement',
      'Clinical oversight and caregiver credentials',
      'Flexible service combinations (care + transportation)',
      'Direct communication and coordination',
    ],
  },
  {
    icon: '🔄',
    title: 'Rehabilitation Centers',
    description: 'Continuity of care support through recovery and transition.',
    benefits: [
      'Alignment with therapy and recovery goals',
      'Coordination with therapy teams',
      'Flexible scheduling and service scaling',
      'Regular updates and communication',
    ],
  },
  {
    icon: '🤝',
    title: 'Social Workers & Care Managers',
    description: 'Trusted partner for your clients\' long-term care needs.',
    benefits: [
      'Professional credibility and vetting',
      'Reliable, accountable service delivery',
      'Rural community coverage (underserved areas)',
      'Flexible billing and funding options',
    ],
  },
  {
    icon: '🏠',
    title: 'Assisted Living & Senior Communities',
    description: 'Support for residents aging in place or transitioning home.',
    benefits: [
      'Supplementary care services',
      'Transportation for appointments and outings',
      'Flexible hourly or daily billing',
      'Seamless care coordination',
    ],
  },
];

export default function ReferralsPage() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/contact" />

      {/* Hero Section */}
      <Hero
        headline="Refer Your Patients to AidaraWell"
        subheadline="Fast, reliable home care placement for your patients. Clinical leadership, rural coverage, and integrated transportation services."
        backgroundImage="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80"
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="#referral-form">
              Submit a Referral
            </LeadButton>
          </div>
        }
      />

      {/* Why Refer to AidaraWell */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Refer to AidaraWell
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We&apos;re the most reliable home care partner in the Fargo region, especially for rural placements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Rapid Placement
              </h3>
              <p className="text-gray-600">
                24-48 hour care start in most cases. Our existing caregiver network means no delays—just fast, reliable placement.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-3xl mb-4">🏥</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Clinical Leadership
              </h3>
              <p className="text-gray-600">
                Our founder brings 12+ years of healthcare experience. Clinical oversight ensures appropriate, quality care delivery.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-3xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Rural Coverage
              </h3>
              <p className="text-gray-600">
                We serve Fargo, Horace, surrounding counties, and underserved rural communities. Perfect for patients who need to age in place.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Transportation + Care
              </h3>
              <p className="text-gray-600">
                Unique among agencies. We combine personal care with transportation—perfect for post-discharge patient needs.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-3xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Background Checked
              </h3>
              <p className="text-gray-600">
                Every caregiver undergoes thorough vetting, reference checks, and training. Your patients are in safe, trusted hands.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dedicated Partnership
              </h3>
              <p className="text-gray-600">
                Direct communication, regular updates, and genuine commitment to patient outcomes. You&apos;re not just making a referral—you&apos;re partnering with us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Referral Partners We Serve
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {partnerTypes.map((partner) => (
              <ReferralPartnerCard
                key={partner.title}
                icon={partner.icon}
                title={partner.title}
                description={partner.description}
                benefits={partner.benefits}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How Referrals Work */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Referrals Work
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg">
                  1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Submit Referral Information
                </h3>
                <p className="text-gray-600">
                  Contact us with patient details: name, diagnosis, care needs, start date, and contact information.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg">
                  2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Immediate Confirmation
                </h3>
                <p className="text-gray-600">
                  We confirm receipt and begin caregiver matching based on patient needs and timeline.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg">
                  3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Caregiver Assignment
                </h3>
                <p className="text-gray-600">
                  We match the perfect caregiver and coordinate care plan details with you and the patient.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-600 text-white font-bold text-lg">
                  4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Care Begins
                </h3>
                <p className="text-gray-600">
                  Caregiver begins service. Ongoing communication and updates throughout the care relationship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ImageSpotlight
        eyebrow="Referral Confidence"
        title="A partner your team can count on"
        description="Hospitals, rehab teams, and social workers need a responsive placement partner. We keep communication tight, move quickly, and coordinate care with the professionalism your patients deserve."
        imageSrc="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Healthcare professionals collaborating on a patient referral"
        reverse
        bullets={[
          'Quick response for discharge and transition planning',
          'Clinical credibility that builds trust with care teams',
          'Clear follow-through once a referral is received',
        ]}
      />

      {/* Referral Form Section */}
      <section id="referral-form" className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Submit a Referral
            </h2>
            <p className="text-lg text-gray-600">
              Fast referral process. Fill out the form or call us directly.
            </p>
          </div>

          <div className="bg-primary-50 rounded-lg p-8 border-2 border-primary-200 mb-8 text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Prefer to Call?
            </h3>
            <p className="text-gray-700 mb-6">
              Refer your patient directly. We&apos;ll confirm care details on the phone.
            </p>
            <a
              href="tel:(701)555-2273"
              className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
            >
              Call Referrals: (701) 555-2273
            </a>
            <p className="text-gray-600 mt-4 text-sm">
              Available Monday–Friday, 9 AM–5 PM CT
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <form method="POST" action="mailto:referrals@aidarawell.com" encType="text/plain" className="space-y-5">
              <div>
                <label htmlFor="partner-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name / Organization
                </label>
                <input
                  type="text"
                  id="partner-name"
                  name="partner_name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="patient-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Patient Name
                </label>
                <input
                  type="text"
                  id="patient-name"
                  name="patient_name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="care-needs" className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Care Needs
                  </label>
                  <input
                    type="text"
                    id="care-needs"
                    name="care_needs"
                    placeholder="e.g., Personal care, Companionship"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Desired Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    name="start_date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  id="contact-phone"
                  name="contact_phone"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={4}
                  placeholder="Any special care requirements, patient preferences, or urgency notes..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Submit Referral
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <CTA
        headline="Become a Trusted Partner"
        description="AidaraWell is committed to working closely with healthcare professionals to deliver the best outcomes for your patients."
        cta={
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <LeadButton size="lg" href="tel:(701)555-2273">
              Call Us: (701) 555-2273
            </LeadButton>
          </div>
        }
        background="primary"
      />
    </>
  );
}
