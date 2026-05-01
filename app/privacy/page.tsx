/**
 * Privacy Policy Page
 * 
 * GPT-style app privacy policy template.
 */

import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/libs/seo';
import { config } from '@/config';

export const metadata: Metadata = generateSEOMetadata({
  title: `Privacy Policy - ${config.app.name}`,
  description: `Privacy Policy for ${config.app.name}. Learn how we collect, use, and protect your data.`,
});

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: {currentDate}</p>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                Welcome to {config.app.name} ({config.app.url}). We are committed to protecting
                your privacy and ensuring you have a positive experience on our website and in
                using our products and services.
              </p>
              <p className="text-gray-700">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your
                information when you visit our website and use our services, including any
                AI-powered features.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                2. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>Payment information (processed securely through Stripe)</li>
                <li>Content you create, upload, or share through our services</li>
                <li>Communications with us (support requests, feedback)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Device information (browser type, operating system, IP address)</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Analytics data (via Google Analytics)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 AI-Generated Content</h3>
              <p className="text-gray-700 mb-4">
                When you use our AI-powered features, we may process your inputs to generate
                responses. This content is processed in real-time and may be temporarily stored
                for quality improvement purposes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>To provide, maintain, and improve our services</li>
                <li>To process transactions and send related information</li>
                <li>To send you technical notices, updates, and support messages</li>
                <li>To respond to your comments, questions, and requests</li>
                <li>To monitor and analyze trends, usage, and activities</li>
                <li>To detect, prevent, and address technical issues and security threats</li>
                <li>To personalize your experience and provide relevant content</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. AI and Machine Learning</h2>
              <p className="text-gray-700 mb-4">
                Our services may use artificial intelligence and machine learning technologies.
                When you interact with AI features:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your inputs may be processed by third-party AI services (e.g., OpenAI, Anthropic)</li>
                <li>We do not use your personal data to train third-party AI models without your explicit consent</li>
                <li>AI-generated content is created in real-time and may not be stored permanently</li>
                <li>You retain ownership of content you create using our services</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Service Providers:</strong> With trusted third parties who assist in
                  operating our services (payment processors, email services, analytics providers)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to protect our
                  rights and safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a merger, acquisition,
                  or sale of assets
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you explicitly authorize us to share
                  your information
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement appropriate technical and organizational measures to protect your
                personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Encryption of data in transit (SSL/TLS)</li>
                <li>Secure authentication and access controls</li>
                <li>Regular security assessments and updates</li>
                <li>Compliance with industry security standards</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="text-gray-700 mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate data
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal data
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your data
                </li>
                <li>
                  <strong>Withdrawal:</strong> Withdraw consent where processing is based on consent
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us at {config.email.replyTo}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage,
                and assist with marketing efforts. You can control cookies through your browser
                settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not
                knowingly collect personal information from children under 13. If you believe we
                have collected information from a child under 13, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your
                country of residence. We ensure appropriate safeguards are in place to protect
                your data in accordance with this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any
                material changes by posting the new Privacy Policy on this page and updating the
                "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p className="text-gray-700 mb-2">
                If you have questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none text-gray-700 space-y-1">
                <li>Email: {config.email.replyTo}</li>
                <li>Website: {config.app.url}</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
