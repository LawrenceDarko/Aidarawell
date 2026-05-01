import { Hero } from '@/components/marketing/Hero';
import { AssessmentForm } from '@/components/forms/AssessmentForm';
import { StickyCallButton } from '@/components/elements/StickyCallButton';
import { ImageSpotlight } from '@/components/marketing/ImageSpotlight';

export default function ContactPage() {
  return (
    <>
      <StickyCallButton phoneNumber="(701) 555-2273" assessmentLink="/contact" />

      {/* Hero Section */}
      <Hero
        headline="Request Your Free Assessment"
        subheadline="Complete this form and we'll call you within 24 hours to discuss your care needs and create a personalized plan."
        backgroundImage="https://images.unsplash.com/photo-1584516150909-c43483ee7932?auto=format&fit=crop&w=1600&q=80"
      />

      <ImageSpotlight
        eyebrow="Start Here"
        title="A simple first conversation can change everything"
        description="Whether you’re calling for a parent, for yourself, or on behalf of a patient, the first step is a confidential conversation about needs, timing, and the right level of support."
        imageSrc="https://images.unsplash.com/photo-1516307365426-bea591f05011?auto=format&fit=crop&w=1600&q=80"
        imageAlt="Family meeting with a home care coordinator"
        reverse
        bullets={[
          'Free and confidential assessment',
          'Clear next steps and honest answers',
          'Fast response for urgent care needs',
        ]}
      />

      {/* Assessment Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tell Us About Your Needs
            </h2>
            <p className="text-gray-600 mb-2">
              Your information is confidential and secure. We'll use it to create a personalized care plan and match you with the perfect caregiver.
            </p>
          </div>

          {/* Assessment Form Component */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
            <AssessmentForm />
          </div>

          {/* Information Cards */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <div className="text-2xl mb-3">📞</div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">
                We'll call within 24 hours. No pressure, just a friendly conversation about your needs.
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <div className="text-2xl mb-3">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Private & Secure</h3>
              <p className="text-gray-600 text-sm">
                Your information is confidential. We never share details without your permission.
              </p>
            </div>

            <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Start</h3>
              <p className="text-gray-600 text-sm">
                Most clients begin care within 24-48 hours of their assessment call.
              </p>
            </div>
          </div>

          {/* Frequently Asked on This Page */}
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Questions About Assessment?
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How long does the assessment call take?
                </h4>
                <p className="text-gray-600">
                  Usually 20-30 minutes. We'll discuss your situation, care needs, preferences, budget, and any concerns.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What should I have ready for the call?
                </h4>
                <p className="text-gray-600">
                  Just be ready to discuss your situation. Have your calendar handy if you want to schedule a caregiver start date. Nothing else needed.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Can I include family members on the call?
                </h4>
                <p className="text-gray-600">
                  Absolutely! Many adult children join calls about their parent's care. Family input helps us create better care plans.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Is there a cost for the assessment?
                </h4>
                <p className="text-gray-600">
                  No. The assessment is completely free. We only discuss pricing and service details after you decide you want to move forward.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Do I have to commit to anything?
                </h4>
                <p className="text-gray-600">
                  Not at all. The assessment is no-obligation. You can ask questions, explore options, and decide what's right for your situation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What if I prefer to call instead of filling out a form?
                </h4>
                <p className="text-gray-600">
                  Perfect! Call us at <strong>(701) 555-2273</strong> and we'll start the assessment right away. No form needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call Alternative Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-2xl mx-auto px-4 md:px-6 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Prefer to Talk Now?
          </h3>
          <p className="text-lg text-gray-700 mb-8">
            No problem. Call us directly and we'll start your assessment right away.
          </p>
          <a
            href="tel:(701)555-2273"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
          >
            Call Now: (701) 555-2273
          </a>
          <p className="text-gray-600 mt-4 text-sm">
            Available Monday–Friday, 9 AM–5 PM CT
          </p>
        </div>
      </section>
    </>
  );
}
