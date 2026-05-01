import { Hero } from '@/components/marketing/Hero';
import { ProcessStep } from '@/components/marketing/ProcessStep';
import { CTA } from '@/components/marketing/CTA';
import { ImageSpotlight } from '@/components/marketing/ImageSpotlight';
import { StickyCallButton, LeadButton } from '@/components';

const processSteps = [
  {
    number: 1,
    title: 'Submit Your Inquiry',
    description: 'Complete our free assessment form (takes 5 minutes). Tell us about your situation, care needs, preferences, and any questions you have.',
  },
  {
    number: 2,
    title: 'Free Assessment Call',
    description: 'Our care coordinator will call within 24 hours to discuss your needs in detail, answer questions, and explain our approach.',
  },
  {
    number: 3,
    title: 'Custom Care Plan',
    description: 'We create a personalized care plan based on your situation, budget, schedule, and preferences. Flexibility is built in.',
  },
  {
    number: 4,
    title: 'Caregiver Match & Start',
    description: 'We match you with the perfect caregiver and begin care as soon as you\'re ready—typically within 24-48 hours.',
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/contact" />

      {/* Hero Section */}
      <Hero
        headline="Simple Process. Rapid Results."
        subheadline="From assessment to care in as few as 4 steps. Fast, transparent, and personalized."
        backgroundImage="https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1600&q=80"
      />

      {/* Process Steps Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transparent process. No surprises. Your care journey is guided every step of the way.
            </p>
          </div>

          <div className="space-y-4 md:space-y-0">
            {processSteps.map((step, idx) => (
              <div key={step.number}>
                <ProcessStep
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
                {idx < processSteps.length - 1 && (
                  <div className="md:hidden h-4 text-center text-primary-400 font-bold text-2xl">
                    ↓
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ImageSpotlight
        eyebrow="What Happens Next"
        title="A calm process that removes the guesswork"
        description="The goal is to make the first step easy. We listen, assess the situation, create a plan, and move quickly so families aren’t stuck waiting when support is needed now."
        imageSrc="https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Care professional speaking with an older adult during a home visit"
        bullets={[
          'A simple call or form takes just a few minutes',
          'We build a plan around the person, the schedule, and the budget',
          'Most families begin service within 24-48 hours',
        ]}
      />

      {/* Why Our Process Works Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why This Process Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-8 border border-primary-200 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fast Communication
              </h3>
              <p className="text-gray-600">
                We call you within 24 hours. No delays, no waiting around. We understand urgency.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-primary-200 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Personalized Planning
              </h3>
              <p className="text-gray-600">
                Your care plan is custom-built for your situation—not a one-size-fits-all approach.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-primary-200 shadow-sm hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quick Start
              </h3>
              <p className="text-gray-600">
                Our existing caregiver network means you don&apos;t wait. Care starts within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Expectations Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Timeline & What to Expect
            </h2>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-700 font-bold text-sm">
                  Day 1
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Submit Assessment</h3>
                <p className="text-gray-600 text-sm">
                  Complete the free online form (5 minutes) or call us directly.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-700 font-bold text-sm">
                  Day 1-2
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Coordinator Call</h3>
                <p className="text-gray-600 text-sm">
                  30-minute call to discuss your situation, needs, timeline, and any questions.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent-100 text-accent-700 font-bold text-sm">
                  Day 2-3
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Caregiver Match</h3>
                <p className="text-gray-600 text-sm">
                  We match you with a caregiver and arrange an introductory call or visit.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-500 text-white font-bold text-sm">
                  Day 3-4
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Care Begins</h3>
                <p className="text-gray-600 text-sm">
                  Your caregiver arrives for the first shift. Care plan in effect. You&apos;re supported.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Common Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                What if I can&apos;t reach you on the first call?
              </h3>
              <p className="text-gray-600 text-sm">
                We follow up via email or text. We use multiple contact methods to reach you within 24 hours.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I request a specific caregiver type?
              </h3>
              <p className="text-gray-600 text-sm">
                Yes! We can match based on gender, language, specific skills, or other preferences. Just let us know during your assessment call.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                What if the caregiver match doesn&apos;t feel right?
              </h3>
              <p className="text-gray-600 text-sm">
                We&apos;ll work with you to find a better match. Our goal is genuine connection—not just getting started.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 border border-primary-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Do I need to be available for the whole assessment call?
              </h3>
              <p className="text-gray-600 text-sm">
                Most assessments are 20-30 minutes. We schedule at your convenience and can work around your availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA
        headline="Start Your Journey Today"
        description="Request your free assessment and discover how quickly we can get you the care you need."
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
